import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-death-type',
  templateUrl: './add-death-type.component.html',
  styleUrls: ['./add-death-type.component.css']
})
export class AddDeathTypeComponent {
  typeForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Output() deathTypeAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
    this.typeForm = this.fb.group({
      name: '',
      description: '',
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show()
      this.service.postToUrl(`${API.CLAIMS}type`, this.typeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.deathTypeAdded.emit();
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
    id: 'type-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('type-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
