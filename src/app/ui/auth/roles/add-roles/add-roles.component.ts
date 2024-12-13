import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from 'src/app/ui/files/add-files/file.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent {
  typeForm!: FormGroup;
  data: any
  @Output() rolesAdded = new EventEmitter<void>();
  departmentOptions = Object.values(Department);
  roles:any

  constructor(private uploadService: UploadService,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
    this.typeForm = this.fb.group({
      department: '',
      name: '',
    });
  } 

  ngOnInit() {
  }




onSubmit(event: Event) {
  event.preventDefault(); 
  if (this.typeForm.valid) { 
    this.spinner.show()
    console.log( this.typeForm.value)
    this.service.postToUrl(`${API.AUTH}roles`, this.typeForm.value).subscribe((res) => {
      this.data = res;
      this.spinner.hide()
      this.alert.showSuccess("Saved Successfully")
      this.rolesAdded.emit();
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
    id: 'roles-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('roles-modal'), modalOptions, instanceOptions);
    modal.hide();
  }


}
