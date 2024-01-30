import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/services/alert.service';
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
  
  constructor(private spinner: NgxSpinnerService, private alert: AlertService,
     private fb: FormBuilder, private service: ApiService, ) {
    this.policyForm = this.fb.group({
      name: '',
      description: '',
      status: ''
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.policyForm.valid) { 
      this.spinner.show()
      this.service.postToUrl(`${API.SERVICE}policies`, this.policyForm.value).subscribe((res) => {
        this.data = res;
        this.alert.showSuccess('Saved Successfully')
        this.spinner.hide()
        this.closeModal()
        this.policyAdded.emit();
      });
    }
  }


  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'rider-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('rider-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
