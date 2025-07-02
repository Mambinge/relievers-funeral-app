import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Rider, RidersService } from 'src/app/services/riders.service';

@Component({
  selector: 'app-update-riders',
  templateUrl: './update-riders.component.html',
  styleUrls: ['./update-riders.component.css']
})
export class UpdateRidersComponent implements OnChanges {
  riderForm: FormGroup;

  @Input() riderToEdit: Rider | null = null;
  @Output() riderUpdated = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private ridersService: RidersService
  ) {
    this.riderForm = this.fb.group({
      ecNumber: ['', Validators.required],
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['riderToEdit'] && this.riderToEdit) {
      this.riderForm.patchValue(this.riderToEdit);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.riderForm.valid && this.riderToEdit) {
      this.spinner.show();
      this.ridersService.updateRider(this.riderToEdit.id, this.riderForm.value).subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('Rider updated successfully');
          this.riderUpdated.emit();
          this.onCloseModal();
        },
        () => {
          this.spinner.hide();
          this.toastr.error('Failed to update rider');
        }
      );
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
