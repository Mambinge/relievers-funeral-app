import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from '../../add-files/file.service';

@Component({
  selector: 'app-add-client-files',
  templateUrl: './add-client-files.component.html',
  styleUrls: ['./add-client-files.component.css']
})
export class AddClientFilesComponent {
  @Output() fileAdded = new EventEmitter<void>();
  @Output() output = new EventEmitter<any>();

  policyForm!: FormGroup;
  fileForm!: FormGroup;
  typeOptions = Object.values(Type);
  accountOptions: any[] = [];
  data: any
  account:any
  accountsId:any
  dataFile: any;
  @Input() accountId: any;

  constructor(private router: Router, 
    private spinner: NgxSpinnerService ,private alert: AlertService, private route: ActivatedRoute,
     private fb: FormBuilder, private service: ApiService,private uploadService: UploadService ) {
 
  } 

  ngOnInit(){
    console.log(this.accountId)

    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accountsId = accountsId
      if(accountsId){
      this.account = this.getAccount(accountsId);
    }
    });

    this.fileForm = this.fb.group({
      file: [''],

    });
    this.policyForm = this.fb.group({
      accountId: this.accountId,
      type: '',
      extension: '.png',
      location: this.dataFile?.location
    });

  }

  getAccount(accountsId: number){
    this.service.getFromUrl(`${API.CLIENTS}clients/${accountsId}`)
    .subscribe((x)=>{
      this.data = x
    })

  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.policyForm.valid) { 
      this.spinner.show()
      this.policyForm.patchValue({
        location: this.dataFile?.location
      });
      this.service.postToUrl(`${API.CLIENTS}kyc-files`, this.policyForm.value,
      
      ).subscribe((res) => {
        this.data = res;
        this.alert.showSuccess('Saved Successfully')
        this.spinner.hide()
        this.closeModal()
        this.output.emit(this.policyForm.value)

        this.fileAdded.emit();
        this.policyForm.reset()
        this.fileForm.reset()
      });
    }
  }

  done(event:any){
    this.router.navigate(['/accounts']);

  }

onFileSelected(event:any) {
  const file: File = event.target.files[0];

  if (file) {
    this.uploadService.uploadFile(file).subscribe((response) => {
        this.dataFile = response
      })
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
  BIRTH_CERT="BIRTH_CERT", 
  NATIONAL_ID="NATIONAL_ID", 
  PASSPORT="PASSPORT", 
  OTHER="OTHER" 
}