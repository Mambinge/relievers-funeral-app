import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import { first } from 'rxjs/operators';
import { Plan } from '../plans.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent {
  planForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Input() planId!: Plan | any;
  @Output() planAdded : EventEmitter<number> = new EventEmitter<number>();
  planOptions: any[] = [];
  planOption: any[] = [];
  plan:any

  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private route: ActivatedRoute,
   private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit() {
    this.service.getFromUrl(`${API.SERVICE}policies`)
    .subscribe((res)=>{
      this.planOptions = res.content
      this.route.params.subscribe((params : any) => {
        const planId = params['id'];
        this.planId = planId
        this.plan = this.getPlan(planId);
      });
    });

    this.planForm = this.fb.group({
      name: '',
      description: '',
      status: '',
      policyId: ''
    });  
 
  }

  getPlan(planId:any){
    if (planId) {
      this.service.getFromUrl(`${API.SERVICE}plan/${planId}`).pipe(first())
        .subscribe(x => this.planForm.patchValue(x));
    }
  }


  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.planForm.valid) { 
      this.spinner.show()
      this.service.updateToUrl(`${API.SERVICE}plan/${this.planId}`, this.planForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
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
