import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-add-premiums',
  templateUrl: './add-premiums.component.html',
  styleUrls: ['./add-premiums.component.css']
})
export class AddPremiumsComponent implements OnInit {
  planOptions: any[] = [];
  premiumsForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Output() planAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: ApiService) {
    this.premiumsForm = this.fb.group({
      name: '',
      description: '',
      status: '',
      planId:'',
      amount: ''
    });
  } 


  ngOnInit() {
    this.http.getAll('plan').subscribe((data) => {
      this.planOptions = data.content;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.premiumsForm.valid) { 
      this.http.postToUrl('premiums', this.premiumsForm.value).subscribe((res) => {
        this.data = res;
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
    id: 'pre-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('pre-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
