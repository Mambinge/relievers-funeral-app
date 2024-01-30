import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-work-stages',
  templateUrl: './add-work-stages.component.html',
  styleUrls: ['./add-work-stages.component.css']
})
export class AddWorkStagesComponent {
  @Output() workStageAdded = new EventEmitter<void>();
  workFlowOptions: any[] = [];
  workStageForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Input() workFlows:any;
  
  constructor(private fb: FormBuilder, private service: ApiService,private spinner: NgxSpinnerService, private alert: AlertService ) {
  } 

  ngOnInit() {
    this.workStageForm = this.fb.group({
      // workFlowId: this.workFlows.name,
      workFlowId: '',
      name: '',
      order: '',
      requiredRoles: '',
      requiredPermissions: '',
      status: ''  
     });
     console.log(this.workStageForm.value.workFlowId)
    this.service.getAll('workflows').subscribe((data) => {
      this.workFlowOptions = data.content;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.workStageForm.valid) { 
      this.spinner.show()
      // const workFlowId = this.workStageForm.value.workFlowId.id;
      // console.log(workFlowId)
      // const formData = {
      //   ...this.workStageForm.value,
      //   workFlowId
      // };
      this.service.postToUrl('workflow-stages', this.workStageForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.workStageAdded.emit();
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
    id: 'crud-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('crud-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
