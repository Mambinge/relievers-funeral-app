import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Agent, AgentService } from 'src/app/services/agent.service';
import { Status } from 'src/app/models/policy-status';
import { Gender, Nationality, Title } from '../../accounts/model/accounts';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent implements OnChanges {
  agentForm: FormGroup;
  genderOptions = Object.values(Gender);
  nationalityOptions = Object.values(Nationality);
  statusOptions = Object.values(Status);
  titleOptions = Object.values(Title);

  @Input() agentToEdit: Agent | null = null;
  @Output() agentUpdated = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private agentService: AgentService
  ) {
    this.agentForm = this.fb.group({
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agentToEdit'] && this.agentToEdit) {
      this.agentForm.patchValue(this.agentToEdit);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.agentForm.valid && this.agentToEdit) {
      this.spinner.show();
      this.agentService.updateAgent(this.agentToEdit.id, this.agentForm.value).subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('Agent updated successfully');
          this.agentUpdated.emit();
          this.onCloseModal();
        },
        () => {
          this.spinner.hide();
          this.toastr.error('Failed to update agent');
        }
      );
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
