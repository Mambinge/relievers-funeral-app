import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import { first } from 'rxjs/operators';
import { Plan } from '../plans.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit {
  planOptions: any[] = [];
  planForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() planAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() planId!: Plan | any;
  policy:any
  products:any

  constructor(private fb: FormBuilder, private http: ApiService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private alert: AlertService) {

  } 


  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const policyId = params['id'];
      this.policy = +policyId
      console.log(policyId)

    });



    this.planForm = this.fb.group({
      name: '',
      description: '',
      status: '',
      policyId: this.policy
    });

    if (this.planId) {
      this.http.getFromUrl(`${API.SERVICE}plan/${this.planId.id}`).pipe(first())
      .subscribe(x => this.planForm.patchValue(x));
    }

    this.http.getFromUrl(`${API.SERVICE}policies`)
    .subscribe((res)=>{
      this.planOptions = res.content
    });

  }

  // getAll(policyId:any){
  //   this.http.getFromUrl(`${API.SERVICE}policies/${policyId}`).subscribe((res) => {
  //     this.products = res.plans
  //     console.log(this.products)
  //   })
  // }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.planForm.valid) { 
      this.spinner.show()
      this.http.postToUrl(`${API.SERVICE}plan`, this.planForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.closeModal();
        this.planAdded.emit(res);
      });
    }
  }

  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'crud-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('crud-modal'), modalOptions, instanceOptions);
    modal.hide();
  }

  showModal() {
    const modalOptions: ModalOptions = {
      onShow: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'crud-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('crud-modal'), modalOptions, instanceOptions);
    modal.show();
  }
}
