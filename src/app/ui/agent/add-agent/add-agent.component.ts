import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status, PaymentStatus, FileType } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Gender, Nationality, Title } from '../../accounts/model/accounts';
import { UploadService } from '../../files/add-files/file.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {
  typeForm!: FormGroup;
  genderOptions = Object.values(Gender);
  nationalityOptions = Object.values(Nationality);
  statusOptions = Object.values(Status);
  data: any
  @Output() planAdded = new EventEmitter<void>();
  agentsOptions:any;
  titleOptions = Object.values(Title);

  constructor(private uploadService: UploadService,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
      this.typeForm = this.fb.group({
        title: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        gender: ['', Validators.required],
        nationality: ['', Validators.required],
        idNumber: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        bankDetails: this.fb.group({
          bank: ['', Validators.required],
          branch: ['', Validators.required],
          accountName: ['', Validators.required],
          accountNumber: ['', Validators.required]
        }),
        contactDetails: this.fb.group({
          phone: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          address: ['', Validators.required]
        }),
        status: ['', Validators.required],
      });
    }
  ngOnInit() {
    this.fetchAgents(); 

  }

  fetchAgents() {
  this.service.getFromUrl(`${API.CLIENTS}agents`).subscribe(data => {
      this.agentsOptions = data.content; 
  });
}




onSubmit(event: Event) {
  event.preventDefault();
  if (this.typeForm.valid) {
    this.spinner.show();
    this.service.postToUrl(`${API.CLIENTS}agents`, this.typeForm.value).subscribe(res => {
      this.data = res;
      this.spinner.hide();
      this.alert.showSuccess("Saved Successfully");
      this.planAdded.emit();
      this.closeModal();
    }, error => {
      this.spinner.hide();
      this.alert.showError("Error saving data");
    });
  } 
}

closeModal() {
  const modalOptions: ModalOptions = { onHide: () => {} };
  const instanceOptions: InstanceOptions = { id: 'agents-modal', override: true };
  const modal = new Modal(document.getElementById('agents-modal'), modalOptions, instanceOptions);
  modal.hide();
}



}
