import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Plan } from '../../plans/plans.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-update-dependents',
  templateUrl: './update-dependents.component.html',
  styleUrls: ['./update-dependents.component.css']
})
export class UpdateDependentsComponent {
  policyOptions: any[] = [];
  planOptions: any[] = [];
  dependentOptions: any[] = [];
  dependentForm!: FormGroup;
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() dependentAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() planId!: Plan | any;
  @Input() dependentId! : any;
  dependentsId!: number;
  dependents!:any

  constructor(private fb: FormBuilder, private http: ApiService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private alert: AlertService) {
  } 

  ngOnInit() {
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

        const dependentId = this.dependentId
        if (dependentId) {        
          this.getDependent()
        }
  }

  getDependent(){
    this.http.getFromUrl(`${API.CLIENTS}dependants/${this.dependentId}`).pipe(first())
    .subscribe(x => this.dependentForm.patchValue(x));
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
  
      this.http.updateToUrl(`${API.CLIENTS}dependants/${this.dependentId}`, requestBody).subscribe((res) => {
        this.data = res;
        this.spinner.hide();
        this.alert.showSuccess("Saved Successfully");
        this.closeModal();
        this.dependentAdded.emit(res);
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
