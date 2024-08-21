import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileType, PaymentStatus, Status } from 'src/app/models/policy-status';
import { Unit } from 'src/app/models/units';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from '../../files/add-files/file.service';

@Component({
  selector: 'app-add-claims',
  templateUrl: './add-claims.component.html',
  styleUrls: ['./add-claims.component.css']
})
export class AddClaimsComponent {
  typeForm!: FormGroup;
  // units = Object.values(Unit);
  data: any
  @Output() planAdded = new EventEmitter<void>();
  statusOptions = Object.values(PaymentStatus);
  fileTypeOptions = Object.values(FileType);
  deathTypeIdOptions: any[] = [];
  units: any[] = [];
  clients: any[] = [];
  policyNumbers: string[] = [];
  // fileUri!: FormControl;
  selectedPolicyNumber: any ;
  dataFile:any
  policyHolderId:any;

  constructor(private uploadService: UploadService,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
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
    // this.fileUri = new FormControl(null);
  } 

  ngOnInit() {
    this.fetchDeathTypes(); 
    this.fetchPolicies();
    this.typeForm.get('policyNumber')?.valueChanges.subscribe(() => {
      this.onPolicyNumberChange(); // Call the method when policyNumber changes
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

    console.log(policyNumbers); 
    });
}

onPolicyNumberChange() {
  const selectedPolicyNumber = this.typeForm.value.policyNumber;
  const selectedClient = this.clients.find(client => client.policyNumber === selectedPolicyNumber);
  console.log(selectedClient)
  if (selectedClient) {
    this.fetchDependents(selectedClient.id); // Fetch dependents based on the selected client's policyHolderId
  }
}

onSubmit(event: Event) {
  event.preventDefault(); 
  if (this.typeForm.valid) { 
    this.spinner.show()
    // this.selectedPolicyNumber = this.typeForm.value.policyNumber; 
    // this.fetchDependents(this.selectedPolicyNumber); 

    this.typeForm.patchValue({
      deathTypeId: Number(this.typeForm.value.deathTypeId),
      dependantId: this.typeForm.value.dependantId ? Number(this.typeForm.value.dependantId) : "", 
      fileUri: this.dataFile
    });
    console.log( this.typeForm.value)
    this.service.postToUrl(`${API.CLAIMS}claims`, this.typeForm.value).subscribe((res) => {
      this.data = res;
      this.spinner.hide()
      this.alert.showSuccess("Saved Successfully")
      this.planAdded.emit();
      this.closeModal();
    });
  }
}

fetchDependents(policyHolderId: string) { 
  this.service.getFromUrl(`${API.CLIENTS}dependants?policyHolderId=${policyHolderId}`).subscribe(data => {
    this.units = data.content;
    console.log(data.content); 
  });
}

  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'claims-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('claims-modal'), modalOptions, instanceOptions);
    modal.hide();
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
