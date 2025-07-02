import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status } from 'src/app/models/policy-status';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Plan, PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent implements OnChanges {
  planForm: FormGroup;
  statusOptions = Object.values(Status);

  @Input() planToEdit: Plan | null = null;
  @Output() planAdded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private plansService: PlansService
  ) {
    this.planForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      policyId: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planToEdit'] && this.planToEdit) {
      this.planForm.patchValue(this.planToEdit);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.planForm.valid && this.planToEdit) {
      this.spinner.show();
      this.plansService.updatePlan(this.planToEdit.id, this.planForm.value).subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('Plan updated successfully');
          this.planAdded.emit();
          this.onCloseModal();
        },
        () => {
          this.spinner.hide();
          this.toastr.error('Failed to update plan');
        }
      );
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
