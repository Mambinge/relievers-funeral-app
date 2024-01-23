import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

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
  
  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private fb: FormBuilder, private service: ApiService) {
    this.paymentMethodForm = this.fb.group({
      name: '',
      description: '',
      status: ''
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.paymentMethodForm.valid) { 
      this.spinner.show()
      this.service.postToUrl(`${API.SERVICE}payment-methods`, this.paymentMethodForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.closeModal()
        this.paymentMethodAdded.emit();
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
