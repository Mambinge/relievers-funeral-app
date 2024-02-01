import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.css']
})
export class AddFilesComponent {
  @Output() policyAdded = new EventEmitter<void>();
  policyForm!: FormGroup;
  fileForm!: FormGroup;
  typeOptions = Object.values(Type);
  accountOptions: any[] = [];
  data: any
  account:any
  accountsId:any
  
  constructor(private spinner: NgxSpinnerService,private httpClient:HttpClient ,private alert: AlertService, private route: ActivatedRoute,
     private fb: FormBuilder, private service: ApiService, ) {
 
  } 

  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accountsId = accountsId
      if(accountsId){
      this.account = this.getAccount(accountsId);
    }
    });

    this.fileForm = this.fb.group({
      file: [null],

    });
    this.policyForm = this.fb.group({
      accountId: this.account,
      type: '',
      name:'',
      extension: '',
      location: this.fileForm.value.file
    });


  }

  getAccount(accountsId: number){
    this.service.getFromUrl(`${API.CLIENTS}clients/${accountsId}`)
    .subscribe((x)=>{
      this.data = x
      console.log(this.data)
    })

  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.policyForm.valid) { 
      this.spinner.show()
      this.service.postToUrl(`${API.CLIENTS}kyc-files`, this.policyForm.value).subscribe((res) => {
        this.data = res;
        this.alert.showSuccess('Saved Successfully')
        this.spinner.hide()
        this.closeModal()
        this.policyAdded.emit();
      });
    }
  }

  uploadFile(event: any) {
    event.preventDefault();
    const pdfFiles = event.target.files;
    if (pdfFiles && pdfFiles.length > 0) {
      const pdfFile = pdfFiles[0];
      const formData: FormData = new FormData();
      formData.append('pdfFile', pdfFile);
      this.spinner.show();
      this.httpClient.post(`${API.CLIENTS}kyc-files/upload`, formData).subscribe(
        (res) => {
          this.alert.showSuccess('Saved Successfully');
          this.spinner.hide();
          this.closeModal();
          this.policyAdded.emit();
        }
      );
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

  showModal() {
    const modalOptions: ModalOptions = {
      onShow: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'crud-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('crud-modal'), modalOptions, instanceOptions);
    modal.show();
  }
}

export enum Type{
  BIRTH_CERT="BIRTH CERTIFICATE", 
  NATIONAL_ID="NATIONAL ID", 
  PASSPORT="PASSPORT", 
  OTHER="OTHER" 
}