import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-plan-premiums',
  templateUrl: './update-plan-premiums.component.html',
  styleUrls: ['./update-plan-premiums.component.css']
})
export class UpdatePlanPremiumsComponent {
  premiumsForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Input() premiumId!: string;
  @Input() planId!: any;
  @Output() planAdded = new EventEmitter<void>();
  planOptions: any[] = [];
  premium:any

  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const premiumId = params['id'];
      this.premiumId = premiumId
      this.premium = this.getPremium(premiumId);
    });

    this.premiumsForm = this.fb.group({
      name: '',
      description: '',
      status: '',
      premiumId:'',
      amount:''
    });

    this.service.getAll(`${API.SERVICE}plan`).subscribe((data) => {
      this.planOptions = data.content;
    });
  }

getPremium(premiumId:any){
  this.service.getFromUrl(`${API.SERVICE}premiums/${premiumId}`).pipe(first())
  .subscribe(x => this.premiumsForm.patchValue(x))

}
  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.premiumsForm.valid) { 
      this.spinner.show()
      this.service.updateToUrl(`${API.SERVICE}premiums/${this.premiumId}`, this.premiumsForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
        this.planAdded.emit();
        this.closeModal();
      });
    }
  }


  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'modal',
    override: true
  };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    modal.hide();
  }


  showModal() {
    const modalOptions: ModalOptions = {
      onShow: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'modal',
    override: true
  };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    modal.show();
  }
}
