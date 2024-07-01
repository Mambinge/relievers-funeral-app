import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-plan-premiums',
  templateUrl: './add-plan-premiums.component.html',
  styleUrls: ['./add-plan-premiums.component.css']
})
export class AddPlanPremiumsComponent {
  planOptions: any[] = [];
  premiumsForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  plan:any
  premiumId:any
  @Output() planAdded = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {

  } 


  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const planId = params['id'];
      this.plan = +planId

    });
    this.http.getAll(`${API.SERVICE}plan`).subscribe((data) => {
      this.planOptions = data.content;
    });

    this.premiumsForm = this.fb.group({
      name: '',
      description: '',
      status: '',
      planId:this.plan,
      amount: ''
    });

    
    if (this.premiumId) {
      this.http.getFromUrl(`${API.SERVICE}plan/${this.premiumId.id}`).pipe(first())
      .subscribe(x => this.premiumsForm.patchValue(x));
    }

    this.http.getFromUrl(`${API.SERVICE}premiums`)
    .subscribe((res)=>{
      this.planOptions = res.content
    });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    // if (this.premiumsForm.valid) { 
      this.spinner.show()
      this.http.postToUrl(`${API.SERVICE}premiums`, this.premiumsForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.planAdded.emit();
        this.closeModal();
      });
    // }
  }

  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'pre-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('pre-modal'), modalOptions, instanceOptions);
    modal.hide();
  }


  showModal() {
    const modalOptions: ModalOptions = {
      onShow: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'pre-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('pre-modal'), modalOptions, instanceOptions);
    modal.show();
  }
}
