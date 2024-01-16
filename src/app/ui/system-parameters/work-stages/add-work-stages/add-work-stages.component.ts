import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';

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
  
  constructor(private fb: FormBuilder, private service: ApiService, ) {
    this.workStageForm = this.fb.group({
      workFlowId: '',
      name: '',
      order: '',
      requiredRoles: '',
      requiredPermissions: '',
      status: ''  
     });
  } 

  ngOnInit() {
    this.service.getAll('workflows').subscribe((data) => {
      this.workFlowOptions = data.content;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.workStageForm.valid) { 
      this.service.postToUrl('workflow-stages', this.workStageForm.value).subscribe((res) => {
        this.data = res;
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
