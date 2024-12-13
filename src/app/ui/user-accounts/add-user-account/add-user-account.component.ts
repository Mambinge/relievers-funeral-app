import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Department } from 'src/app/models/department';
import { Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-user-account',
  templateUrl: './add-user-account.component.html',
  styleUrls: ['./add-user-account.component.css']
})
export class AddUserAccountComponent {
  riderForm!: FormGroup;
  departmentOptions = Object.values(Department);
  rolesOptions :any[] =[];
  data: any
  currentPage = 0;
  totalPages:any
  roles:any;
  @Output() planAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
    this.riderForm = this.fb.group({
      ecNumber: "",
      location: "",
      username: "",
      fullName: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      department: "",
      otpEnabled: false,
      roles: [ ""],
      verified: true   
     });
     this.loadRoles();
  } 

  loadRoles() { 
      this.service.getAll(`${API.AUTH}roles?page=${this.currentPage}&size=7`).subscribe((res)=>{
        this.rolesOptions = res.content
        this.totalPages = res.totalPages;
      })
    }

    onSubmit(event: Event) {
      event.preventDefault(); 
      if (this.riderForm.valid) { 
        this.spinner.show();
        
        // Patch role to 1
        const formData = { ...this.riderForm.value, roles: ["1"] }; // Update roles to [1]
  
        this.service.postToUrl(`${API.AUTH}users/register`, formData).subscribe((res) => {
          this.data = res;
          this.spinner.hide();
          this.alert.showSuccess("Saved Successfully");
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
    id: 'user-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('user-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
