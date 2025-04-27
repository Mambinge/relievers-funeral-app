import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PaymentStatus, FileType } from 'src/app/models/policy-status';
import { UploadService } from '../../files/add-files/file.service';

@Component({
  selector: 'app-update-claims',
  templateUrl: './update-claims.component.html',
  styleUrls: ['./update-claims.component.css']
})
export class UpdateClaimsComponent {
  typeForm!: FormGroup;
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() claimsAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() claimsId! : any;
  claim:any;

  statusOptions = Object.values(PaymentStatus);
  fileTypeOptions = Object.values(FileType);
  deathTypeIdOptions: any[] = [];
  dataFile:any;
  clients: any[] = [];
  policyHolderId:any;
  units: any[] = [];

  constructor(private uploadService: UploadService, private route: ActivatedRoute,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
  } 

  ngOnInit() {
    console.log(this.claimsId)
    const claimId = this.claimsId
    if (claimId) {        
      this.getClaim(claimId)
    }
    console.log(this.claimsId)
    this.typeForm = this.fb.group({
      policyNumber: '',
      deathDate: '',
      claimDate: '',
      deathTypeId: '',
      dependantId: '',
      burialDate: '',
      amount: '',
      fileUri: '',
      fileType: '',
      status: '',
      primaryMember: true,
    });

    this.fetchDeathTypes(); 
    this.fetchPolicies();
    this.typeForm.get('policyNumber')?.valueChanges.subscribe(() => {
      this.onPolicyNumberChange(); // Call the method when policyNumber changes
    });

  }

  getClaim(claimId:any) {
    this.service.getFromUrl(`${API.CLAIMS}claims/${claimId}`).pipe(first())
        .subscribe(x => {
            // Patch each field one by one
            this.typeForm.patchValue({
                policyNumber: x.clientAccount.policyNumber,
                deathDate: x.deathDate,
                claimDate: x.claimDate,
                deathTypeId: x.deathTypeId,
                dependantId: x.dependantId,
                burialDate: x.burialDate,
                amount: x.amount,
                fileUri: x.fileUri,
                fileType: x.fileType,
                status: x.status,
                primaryMember: x.primaryMember
            });
        });
  }

  fetchDeathTypes() {
    this.service.getFromUrl(`${API.CLAIMS}type`).subscribe(data => {
        this.deathTypeIdOptions = data.content; 
    });
  }
  
  
  fetchPolicies() {
    this.service.getFromUrl(`${API.CLIENTS}clients`).subscribe(data => {
      this.clients = data.content.filter((client: { status: string; policyNumber: any; }) => client.status === 'APPROVED' && client.policyNumber);
      const policyNumbers = this.clients.map(client => client.policyNumber); 
       this.policyHolderId = this.clients.map(client => client.policyHolderId); 
        });
  }
  
  onPolicyNumberChange() {
    const selectedPolicyNumber = this.typeForm.value.policyNumber;
    const selectedClient = this.clients.find(client => client.policyNumber === selectedPolicyNumber);
    if (selectedClient) {
      this.fetchDependents(selectedClient.id); // Fetch dependents based on the selected client's policyHolderId
    }
  }

  fetchDependents(policyHolderId: string) { 
    this.service.getFromUrl(`${API.CLIENTS}dependants?policyHolderId=${policyHolderId}`).subscribe(data => {
      this.units = data.content;
    });
  }



  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show();

      this.typeForm.patchValue({
        deathTypeId: Number(this.typeForm.value.deathTypeId),
        dependantId: this.typeForm.value.dependantId ? Number(this.typeForm.value.dependantId) : "", 
        fileUri: this.dataFile
      });

      this.service.updateToUrl(`${API.CLAIMS}claims/${this.claimsId}`, this.typeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide();
        this.alert.showSuccess("Saved Successfully");
        this.closeModal();
        this.claimsAdded.emit(res);
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

  onFileChange(event: any) { 
    const file: File = event.target.files[0];

    if (file) {
      this.uploadService.uploadFile(file).subscribe((response:any) => {
          this.dataFile = response.location;
          console.log(this.dataFile);
          // Update the form value here instead of binding directly
          this.typeForm.patchValue({
              fileUri: this.dataFile // Set the fileUri in the form after upload
          });
      });
    }    
}
}
