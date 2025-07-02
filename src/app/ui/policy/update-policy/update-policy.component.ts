import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Policy, PolicyService } from 'src/app/services/policy.service';
import { Status } from 'src/app/models/policy-status';

@Component({
  selector: 'app-update-policy',
  templateUrl: './update-policy.component.html',
  styleUrls: ['./update-policy.component.css']
})
export class UpdatePolicyComponent implements OnChanges {
  policyForm: FormGroup;
  statusOptions = Object.values(Status);

  @Input() policyToEdit: Policy | null = null;
  @Output() policyUpdated = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private policyService: PolicyService
  ) {
    this.policyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['policyToEdit'] && this.policyToEdit) {
      this.policyForm.patchValue(this.policyToEdit);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.policyForm.valid && this.policyToEdit) {
      this.spinner.show();
      this.policyService.updatePolicy(this.policyToEdit.id, this.policyForm.value).subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('Policy updated successfully');
          this.policyUpdated.emit();
          this.onCloseModal();
        },
        () => {
          this.spinner.hide();
          this.toastr.error('Failed to update policy');
        }
      );
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
