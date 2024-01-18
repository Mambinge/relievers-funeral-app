import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-payment-settings',
  templateUrl: './add-payment-settings.component.html',
  styleUrls: ['./add-payment-settings.component.css']
})
export class AddPaymentSettingsComponent {
  @Output() paymentSettingsAdded = new EventEmitter<void>();
  
  paymentSettingsForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  
  constructor(private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
    this.paymentSettingsForm = this.fb.group({
      curency: '',
      rate: '',
      status: ''
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.paymentSettingsForm.valid) { 
      this.spinner.show()
      this.service.postToUrl('payment-settingd', this.paymentSettingsForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.paymentSettingsAdded.emit();
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
