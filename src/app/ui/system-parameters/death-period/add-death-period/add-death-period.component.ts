import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { Unit } from 'src/app/models/units';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-death-period',
  templateUrl: './add-death-period.component.html',
  styleUrls: ['./add-death-period.component.css']
})
export class AddDeathPeriodComponent {
  typeForm!: FormGroup;
  units = Object.values(Unit);
  data: any
  @Output() deathperiodAdded = new EventEmitter<void>();
  statusOptions = Object.values(Status);

  constructor(private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
    this.typeForm = this.fb.group({
      title: '',
      period: '',
      unit: '',
      status:'INACTIVE'
    });
  } 

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show()
      this.service.postToUrl(`${API.CLAIMS}period`, this.typeForm.value).subscribe((res) => {
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
    id: 'death-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('death-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
