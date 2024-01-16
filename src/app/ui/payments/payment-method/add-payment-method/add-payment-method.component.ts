import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css']
})
export class AddPaymentMethodComponent {
  @Output() paymentMethodAdded = new EventEmitter<void>();
  
  paymentMethodForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  
  constructor(private fb: FormBuilder, private service: ApiService) {
    this.paymentMethodForm = this.fb.group({
      name: '',
      description: '',
      status: ''
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.paymentMethodForm.valid) { 
      this.service.postToUrl('payment-methods', this.paymentMethodForm.value).subscribe((res) => {
        this.data = res;
        this.paymentMethodAdded.emit();
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
