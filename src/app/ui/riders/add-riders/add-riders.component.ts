import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-riders',
  templateUrl: './add-riders.component.html',
  styleUrls: ['./add-riders.component.css']
})
export class AddRidersComponent {
  riderForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Output() planAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
    this.riderForm = this.fb.group({
      name: '',
      description: '',
      status: ''
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.riderForm.valid) { 
      this.spinner.show()
      this.service.postToUrl('rider', this.riderForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.planAdded.emit();
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
    id: 'rider-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('rider-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
