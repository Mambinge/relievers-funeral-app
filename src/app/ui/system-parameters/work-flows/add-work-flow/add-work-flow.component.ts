import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-work-flow',
  templateUrl: './add-work-flow.component.html',
  styleUrls: ['./add-work-flow.component.css']
})
export class AddWorkFlowComponent {
  @Output() workFlowAdded = new EventEmitter<void>();
  
  workFlowForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  
  constructor(private fb: FormBuilder, private service: ApiService,private spinner: NgxSpinnerService, private alert: AlertService) {
    this.workFlowForm = this.fb.group({
      name: '',
      type:'',
      description: '',
      status: '',
    });
  } 

  ngOnInit(){
    // this.service.getFromUrl()
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.workFlowForm.valid) { 
      this.spinner.show()
      this.service.postToUrl(`${API.SERVICE}workflows`, this.workFlowForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.workFlowAdded.emit();
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
    id: 'crud-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('crud-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
