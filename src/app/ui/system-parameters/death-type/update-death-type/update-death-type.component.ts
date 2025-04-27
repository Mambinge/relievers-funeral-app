import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-death-type',
  templateUrl: './update-death-type.component.html',
  styleUrls: ['./update-death-type.component.css']
})
export class UpdateDeathTypeComponent {
  deathTypeForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Input() deathTypesId!: string;
  deathType:any
  @Output() deathTypeAdded = new EventEmitter<void>();

  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit(){
console.log(this.deathTypesId)
    this.deathTypeForm = this.fb.group({
      name: '',
      description: '',
    });
  }

  getdeathType(deathTypeId: any) {
    this.service.getFromUrl(`${API.CLAIMS}type/${deathTypeId}`).pipe(first())
      .subscribe(
        (response: any) => {
          console.log('Fetched death type:', response); // Check if data is correct
          this.deathType = response;
          this.deathTypeForm.patchValue(response); // Patch the form with new data
        },
        error => {
          console.error('Error fetching death type:', error);
        }
      );
  }
  
  

  onSubmit(event: Event, deathTypesId: any) {
    console.log(this.deathTypesId)

    event.preventDefault(); 
    if (this.deathTypeForm.valid) {
      this.spinner.show() 
      this.service.updateToUrl(`${API.CLAIMS}type/${deathTypesId}`, this.deathTypeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
        this.closeModal();
        this.deathTypeAdded.emit();

      });
    }
  }

  showModal(deathTypesId: any) {
    console.log(deathTypesId)
    const modalOptions: ModalOptions = {
      onShow: () => {
        // Clear and load the new data before showing the modal
        this.getdeathType(deathTypesId);
      },
    };
    const instanceOptions: InstanceOptions = {
      id: 'modal',
      override: true
    };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    
    // Ensure the modal is being properly shown
    modal.show();
  }
  
  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'modal',
    override: true
  };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
