import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from '../../files/add-files/file.service';
import { Gender, Nationality, Title } from '../../accounts/model/accounts';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent {
  typeForm!: FormGroup;
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() agentsAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() agentsId! : any;
  genderOptions = Object.values(Gender);
  nationalityOptions = Object.values(Nationality);
  statusOptions = Object.values(Status);
  titleOptions = Object.values(Title);


  constructor(private uploadService: UploadService, private route: ActivatedRoute,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
  } 

  ngOnInit() {
    console.log(this.agentsId)
    const agentId = this.agentsId
    if (agentId) {        
      this.getAgent(agentId)
    }
    console.log(this.agentsId)
    this.typeForm = this.fb.group({
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

  getAgent(agentId:any) {
    this.service.getFromUrl(`${API.CLIENTS}agents/${agentId}`).pipe(first())
        .subscribe(x => {
            // Patch each field one by one
            this.typeForm.patchValue({
              title: x.title,
              name: x.name,
              surname: x.surname,
              gender: x.gender,
              nationality: x.nationality,
              idNumber: x.idNumber,
              dateOfBirth: x.dateOfBirth,
              bankDetails: x.bankDetails,
              contactDetails: x.contactDetails,
              status: x.status,
            });
        });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show();

      this.service.updateToUrl(`${API.CLIENTS}agents/${this.agentsId}`, this.typeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide();
        this.alert.showSuccess("Saved Successfully");
        this.closeModal();
        this.agentsAdded.emit(res);
      });
    }
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

  showModal() {
    const modalOptions: ModalOptions = {
      onShow: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'modal',
    override: true
  };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    modal.show();
  }


}
