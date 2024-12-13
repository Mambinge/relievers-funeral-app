import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Settings, Status, Types } from 'src/app/models/policy-status';
import { Unit } from 'src/app/models/units';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-commission-settings',
  templateUrl: './add-commission-settings.component.html',
  styleUrls: ['./add-commission-settings.component.css']
})
export class AddCommissionSettingsComponent {
  typeForm!: FormGroup;
  units = Object.values(Unit);
  data: any
  @Output() deathperiodAdded = new EventEmitter<void>();
  accountTypeOptions = Object.values(Settings);
  typeOptions = Object.values(Types);

  constructor(private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
    this.typeForm = this.fb.group({
      commission: '',
      expiryDate: '',
      accountType: '',
      type:''
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show()
      this.service.postToUrl(`${API.CLIENTS}commission-settings`, this.typeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.deathperiodAdded.emit();
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
    id: 'settings-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('settings-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
