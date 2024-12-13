import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Department } from 'src/app/models/department';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from 'src/app/ui/files/add-files/file.service';

@Component({
  selector: 'app-update-password-policy',
  templateUrl: './update-password-policy.component.html',
  styleUrls: ['./update-password-policy.component.css']
})
export class UpdatePasswordPolicyComponent {
  typeForm!: FormGroup;
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() passwordPolicyAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() passwordPolicyId! : any;
  passwordPolicy:any;
  departmentOptions = Object.values(Department);

  constructor(private uploadService: UploadService, private route: ActivatedRoute,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
  } 

  ngOnInit() {
    console.log(this.passwordPolicyId)
    const passwordPolicyId = this.passwordPolicyId
    if (passwordPolicyId) {        
      this.getpasswordPolicy(passwordPolicyId)
    }
    console.log(this.passwordPolicyId)
    this.typeForm = this.fb.group({
      department: '',
      regex: '',
      expInDay: 0,
      expires: true,
      minimumLength: 0,
      maximumLength: 0,
      usesNumbers: true,
      usesSpecialCharacter: true,
      maximumLoginAttempts: 0  
      });

  }

  getpasswordPolicy(passwordPolicyId:any) {
    this.service.getFromUrl(`${API.AUTH}password-policy/${passwordPolicyId}`).pipe(first())
        .subscribe(x => {
            this.typeForm.patchValue({
                department: x.department,
                regex: x.regex,
                expInDay: x.expInDay,
                expires: x.expires,
                minimumLength: x.minimumLength,
                maximumLength: x.maximumLength,
                usesNumbers: x.usesNumbers,
                usesSpecialCharacter: x.usesSpecialCharacter,
                maximumLoginAttempts: x.maximumLoginAttempts
            });
        });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show();

      this.service.updateToUrl(`${API.AUTH}password-policy/${this.passwordPolicyId}`, this.typeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide();
        this.alert.showSuccess("Saved Successfully");
        this.closeModal();
        this.passwordPolicyAdded.emit(res);
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
