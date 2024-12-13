import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from 'src/app/ui/files/add-files/file.service';

@Component({
  selector: 'app-add-password-policy',
  templateUrl: './add-password-policy.component.html',
  styleUrls: ['./add-password-policy.component.css']
})
export class AddPasswordPolicyComponent {
  typeForm!: FormGroup;
  data: any
  @Output() passwordPolicyAdded = new EventEmitter<void>();
  departmentOptions = Object.values(Department);
  passwordPolicy:any
  expiresChecked:any

  constructor(private uploadService: UploadService,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
    this.typeForm = this.fb.group({
      department: '',
      regex: '',
      expInDay: 0,
      expires: true,
      minimumLength: 0,
      maximumLength: 0,
      usesNumbers: true,
      usesSpecialCharacter: true,
      maximumLoginAttempts: 0  
      });
  } 

  ngOnInit() {
  }




onSubmit(event: Event) {
  event.preventDefault(); 
  if (this.typeForm.valid) { 
    this.spinner.show()
    console.log( this.typeForm.value)
    this.service.postToUrl(`${API.AUTH}password-policy/create`, this.typeForm.value).subscribe((res) => {
      this.data = res;
      this.spinner.hide()
      this.alert.showSuccess("Saved Successfully")
      this.passwordPolicyAdded.emit();
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
    id: 'passwordPolicy-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('passwordPolicy-modal'), modalOptions, instanceOptions);
    modal.hide();
  }


}
