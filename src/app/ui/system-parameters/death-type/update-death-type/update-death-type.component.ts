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

    this.deathTypeForm = this.fb.group({
      name: '',
      description: '',
    });
  }

  getdeathType(deathTypeId:any){
      this.service.getFromUrl(`${API.CLAIMS}type/${deathTypeId}`).pipe(first())
        .subscribe(x => this.deathTypeForm.patchValue(x));
  }

  onSubmit(event: Event, deathTypesId: any) {
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
    const modalOptions: ModalOptions = {
      onShow: () => {
        this.getdeathType(deathTypesId); 
      },
    };
    const instanceOptions: InstanceOptions = {
      id: 'modal',
      override: true
    };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
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
