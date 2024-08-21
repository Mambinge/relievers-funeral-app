import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InstanceOptions, Modal } from 'flowbite';
import { ModalOptions } from 'flowbite/lib/esm/components/modal/types';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentStatus, FileType, Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from '../../files/add-files/file.service';

@Component({
  selector: 'app-add-claim-approval',
  templateUrl: './add-claim-approval.component.html',
  styleUrls: ['./add-claim-approval.component.css'],
})
export class AddClaimApprovalComponent implements AfterViewInit {
  typeForm!: FormGroup;
  // units = Object.values(Unit);
  data: any;
  @Input() accountId: any;
  @Input() policyNumber: any;
  @Input() claimId: any;
  @Input() account:any
  @Output() planAdded = new EventEmitter<void>();
  workFlowOptions: any[] = [];
  units: any[] = [];
  clients: any[] = [];
  policyNumbers: string[] = [];
  // fileUri!: FormControl;
  selectedPolicyNumber: any;
  dataFile: any;
  policyHolderId: any;
  statusOptions = Object.values(Status);
  status ="APPROVED"
  filteredWorkFlowStageOptions:any
  workFlowStageOptions:any[]=[]

  constructor(
    private uploadService: UploadService,
    private fb: FormBuilder,
    private service: ApiService,
    private spinner: NgxSpinnerService,
    private alert: AlertService
  ) {



  }
  ngAfterViewInit() {
    const modalElement = document.getElementById('claim-approval-modal');
    if (modalElement) {
      const modal = new Modal(modalElement, {
        // options here
      });
    }
  }
  ngOnInit() {
    console.log(this.account);

    this.fetchWorkFlow();
    console.log(this.policyNumber)
    this.typeForm = this.fb.group({
      claimId: this.claimId,
      status: this.status,
      workFlow: {
        id:1   
      } ,
      workFlowStage: {
        id:this.account?.id,
              },
      reason: '',
      policyNumber: this.policyNumber,
    });
    this.service.getFromUrl(`${API.SERVICE}workflows`).subscribe((res)=>{
      this.workFlowOptions = res.content;

    })
  }

  onWorkFlowChange(event: Event) {
    const selectedWorkFlowId = (event.target as HTMLSelectElement).value;
    this.filteredWorkFlowStageOptions = this.workFlowStageOptions.filter((stages) => stages.workFlowId === selectedWorkFlowId);
  }

  fetchWorkFlow() {
    this.service.getFromUrl(`${API.SERVICE}workflows`).subscribe((data) => {
      this.workFlowOptions = data.content;
      console.log(this.workFlowOptions)
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.typeForm.valid) {
      console.log(this.typeForm.value)
      this.spinner.show();

      // const selectedWorkFlow = this.typeForm.get('workFlow')?.value;
      // console.log(selectedWorkFlow)
      // if (selectedWorkFlow) {
      //   this.typeForm.patchValue({
      //     workFlow: {
      //       id: 3, 
      //       name: selectedWorkFlow.name || '',
      //       type: selectedWorkFlow.type || '',
      //       stages: selectedWorkFlow.stages || [],
      //     },
      //     accountId: this.accountId,
      //     policyNumber: this.policyNumber,

      //   });
      // }
      const requestBody = {
        claimId: parseInt(this.claimId, 10),
        policyNumber: this.policyNumber,
        status: this.status,
        reason: this.typeForm.value.reason,
        workFlow: {
          // id: parseInt(this.approvalForm.value.workFlow, 10)
          id: 3
        },
        workFlowStage: {
          id: this.account?.id
        }
      };
      console.log(this.account);
      console.log(requestBody);

      this.service
        .postToUrl(`${API.CLAIMS}claim-approval`, requestBody)
        .subscribe((res) => {
          this.data = res;
          this.spinner.hide();
          this.alert.showSuccess('Saved Successfully');
          this.planAdded.emit();
          this.closeModal();
        });
    }
  }



  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {},
    };
    const instanceOptions: InstanceOptions = {
      id: 'claim-approval-modal',
      override: true,
    };
    const modal = new Modal(
      document.getElementById('claim-approval-modal'),
      modalOptions,
      instanceOptions
    );
    modal.hide();
  }


}
