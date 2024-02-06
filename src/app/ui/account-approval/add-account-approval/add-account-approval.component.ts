import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import {  NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-add-account-approval',
  templateUrl: './add-account-approval.component.html',
  styleUrls: ['./add-account-approval.component.css']
})
export class AddAccountApprovalComponent {
  workFlowOptions: any[] = [];
  workFlowStageOptions:any[]=[]
  payoutOptions: any[] = [];
  approvalForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any;
  isAddMode!: boolean;
  accounts:any;
  approvalAdded:any
  @Input() accountId:any
  @Input() account:any
   status ="APPROVED"

  filteredWorkFlowStageOptions:any
  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
 console.log(this.account)
 console.log(this.accountId)

    this.approvalForm = this.fb.group({
      accountId: this.accountId,
      status: this.status,
      policyNumber:'',
      reason: '',
      workFlow: {
        id:''   
      } ,
      workFlowStage: {
        id:this.account?.id,
              }
    });

   
    this.http.getFromUrl(`${API.SERVICE}workflows`).subscribe((res)=>{
      this.workFlowOptions = res.content;
      console.log(this.workFlowOptions)

    })


  }

onWorkFlowChange(event: Event) {
  const selectedWorkFlowId = (event.target as HTMLSelectElement).value;
  this.filteredWorkFlowStageOptions = this.workFlowStageOptions.filter((stages) => stages.workFlowId === selectedWorkFlowId);
console.log(this.filteredWorkFlowStageOptions)
}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.approvalForm.valid) {
      this.spinner.show()

      const requestBody = {
        accountId: parseInt(this.accountId, 10),
        policyNumber: this.approvalForm.value.policyNumber,
        status: this.status,
        reason: this.approvalForm.value.reason,
        workFlow: {
          id: parseInt(this.approvalForm.value.workFlow, 10)
        },
        workFlowStage: {
          id: this.account?.id
        }
      };
      console.log(requestBody)
      this.http.postToUrl(`${API.CLIENTS}account-approval`, requestBody).subscribe((res) => {
        this.data = res;
        this.spinner.hide()

        this.approvalAdded.emit(res);
        this.closeModal();
      });
    }
  }

  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {},
    };
    const instanceOptions: InstanceOptions = {
      id: 'crud-modal',
      override: true,
    };
    const modal = new Modal(
      document.getElementById('crud-modal'),
      modalOptions,
      instanceOptions
    );
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


enum Status{
  // ACTIVE = "ACTIVE", 
  // PENDING = "PENDING", 
  // AWAITING_APPROVALS = "AWAITING_APPROVALS", 
  APPROVED = "APPROVED", 
  REJECTED ="REJECTED"
  // AWAITING_DELETION = "AWAITING_DELETION", 
  // ON_WAITING_PERIOD = "ON_WAITING_PERIOD", 
  // IN_SUSPENSE = "ON_WAITING_PERIOD"
}