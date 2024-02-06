import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Plan } from '../../plans/plans.component';

@Component({
  selector: 'app-add-dependents',
  templateUrl: './add-dependents.component.html',
  styleUrls: ['./add-dependents.component.css']
})
export class AddDependentsComponent {
  policyOptions: any[] = [];
  planOptions: any[] = [];
  dependentOptions: any[] = [];
  dependentForm!: FormGroup;
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() dependentAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() planId!: Plan | any;
  dependentsId!: number;
  dependents!:any

  constructor(private fb: FormBuilder, private http: ApiService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private alert: AlertService) {
  } 

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const dependentsId = params['id'];
      this.dependentsId = +dependentsId
      if(dependentsId){
      console.log(this.dependentsId)
    }
    }); 

    this.dependentForm = this.fb.group({
        policyHolderId: '',
        name: '',
        surname: '',
        idNumber: '',
        relationshipToMember: '',
        plan: {
          id:'',
          name: ''
                }
    });


    this.http.getFromUrl(`${API.SERVICE}plan`)
    .subscribe((res)=>{
      this.planOptions = res.content.map((plan: any) => ({ id: plan.id, name: plan.name }));
      console.log(this.planOptions);
        });

  }


  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.dependentForm.valid) { 
      this.spinner.show();

      const selectedPlan = this.dependentForm.value.plan;
      const selectedPlanId = selectedPlan.id; 
      const selectedPlanName = selectedPlan.name; 

      const requestBody = {
        policyHolderId: this.dependentsId,
        name: this.dependentForm.value.name,
        surname: this.dependentForm.value.surname,
        idNumber: this.dependentForm.value.idNumber,
        relationshipToMember: this.dependentForm.value.relationshipToMember,
        plan: {
          id: selectedPlanId,
          name: selectedPlanName 
        }
      };
  
      this.http.postToUrl(`${API.CLIENTS}dependants`, requestBody).subscribe((res) => {
        this.data = res;
        this.spinner.hide();
        this.alert.showSuccess("Saved Successfully");
        this.closeModal();
        this.dependentAdded.emit(res);
        this.dependentForm.reset()
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
