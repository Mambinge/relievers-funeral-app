import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent {
  @Output() policyAdded = new EventEmitter<void>();
  
  policyForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  
  constructor(private fb: FormBuilder, private service: ApiService, ) {
    this.policyForm = this.fb.group({
      name: '',
      description: '',
      status: ''
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.policyForm.valid) { 
      this.service.postToUrl('policies', this.policyForm.value).subscribe((res) => {
        this.data = res;
        this.policyAdded.emit();
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
