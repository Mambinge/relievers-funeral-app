import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Department } from 'src/app/models/department';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-add-user-account',
  templateUrl: './add-user-account.component.html',
  styleUrls: ['./add-user-account.component.css']
})
export class AddUserAccountComponent {
  riderForm!: FormGroup;
  departmentOptions = Object.values(Department);
  rolesOptions: any[] = [];
  data: any;
  currentPage = 0;
  totalPages: any;
  roles: any;
  @Input() userToEdit: any;  // Receive the user to edit
  @Output() planAdded = new EventEmitter<void>();
  editMode: boolean = false;  // Flag to check if in edit mode

  constructor(private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService, private alert: AlertService) {
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
      roles: [""],
      verified: true   
    });
    this.loadRoles();
  }

  ngOnChanges() {
    if (this.userToEdit) {
      this.editMode = true;
      this.populateForm(this.userToEdit);
    }
  }

  loadRoles() {
    this.service.getAll(`${API.AUTH}roles?page=${this.currentPage}&size=7`).subscribe((res) => {
      this.rolesOptions = res.content;
      this.totalPages = res.totalPages;
    });
  }

  populateForm(user: any) {
    this.riderForm.patchValue({
      username: user.username,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      password: '',  // Leave password empty for security
      confirmPassword: '',
      department: user.department,
      otpEnabled: user.otpEnabled === 'TRUE',
      roles: user.roles || [""],  // Ensure roles are set correctly
      verified: user.verified
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.riderForm.valid) {
      this.spinner.show();

      const formData = { ...this.riderForm.value, roles: ["1"] }; // Update roles to [1]

      if (this.editMode) {
        // Update existing user
        this.service.updateToUrl(`${API.AUTH}users/${this.userToEdit.id}`, formData).subscribe((res) => {
          this.data = res;
          this.spinner.hide();
          this.alert.showSuccess("User Updated Successfully");
          this.planAdded.emit();
          this.closeModal();
        });
      } else {
        // Add new user
        this.service.postToUrl(`${API.AUTH}users/register`, formData).subscribe((res) => {
          this.data = res;
          this.spinner.hide();
          this.alert.showSuccess("User Added Successfully");
          this.planAdded.emit();
          this.closeModal();
        });
      }
    }
  }

  closeModal() {
    const modal = new Modal(document.getElementById('user-modal'));
    modal.hide();
  }
}
