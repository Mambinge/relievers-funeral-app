import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User, UserAccountsService } from 'src/app/services/user-accounts.service';

@Component({
  selector: 'app-update-user-account',
  templateUrl: './update-user-account.component.html',
  styleUrls: ['./update-user-account.component.css']
})
export class UpdateUserAccountComponent implements OnChanges, OnInit {
  riderForm: FormGroup;
  departmentOptions: string[] = ['Sales', 'Marketing', 'IT', 'Human Resources'];
  rolesOptions: any[] = [];
  isEdit: boolean = false;

  @Input() userToEdit: User | null = null;
  @Output() planAdded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private userAccountsService: UserAccountsService
  ) {
    this.riderForm = this.fb.group({
      username: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      department: ['', Validators.required],
      otpEnabled: [false],
      roles: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.userToEdit) {
      this.isEdit = true;
      this.riderForm.patchValue({
        ...this.userToEdit,
        roles: this.userToEdit.roles ? this.userToEdit.roles.map((r: any) => r.id) : []
      });
    }

    this.loadRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userToEdit'] && this.userToEdit) {
      this.populateForm(this.userToEdit);
    }
  }

  loadRoles(): void {
    this.userAccountsService.getRoles().subscribe(response => {
      this.rolesOptions = response.content;
    });
  }

  populateForm(user: User): void {
    this.riderForm.patchValue({
      username: user.username,
      phoneNumber: user.phoneNumber,
      department: user.department,
      otpEnabled: user.otpEnabled === 'true',
      roles: user.roles ? user.roles.map((r: any) => r.id) : []
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.riderForm.valid) {
      this.spinner.show();
      const formData = this.riderForm.value;

      if (this.userToEdit) {
        this.userAccountsService.updateUser(this.userToEdit.id, formData).subscribe(() => {
          this.spinner.hide();
          this.toastr.success('User updated successfully');
          this.planAdded.emit();
          this.onCloseModal();
        }, () => {
          this.spinner.hide();
          this.toastr.error('Failed to update user');
        });
      }
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
