import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Settings, Status } from 'src/app/models/policy-status';
import { Unit } from 'src/app/models/units';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-commission-settings',
  templateUrl: './update-commission-settings.component.html',
  styleUrls: ['./update-commission-settings.component.css']
})
export class UpdateCommissionSettingsComponent {
  typeForm!: FormGroup;
  units = Object.values(Unit);
  data: any
  @Input() settingsId!: any;
  settingId:any
  accountTypeOptions = Object.values(Settings);
  @Output() settingAdded = new EventEmitter<void>();

  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit(){
    console.log(this.settingsId)
    this.typeForm = this.fb.group({
      commssion: '',
      expiryDate: '',
      accountType: '',
    });
  }


  getSetting(settingId: any) {
    this.service.getFromUrl(`${API.CLAIMS}commission-settings/${settingId}`).pipe(first())
      .subscribe(x => {
        console.log('Data received for patching:', x);

        this.typeForm.patchValue(x);
        console.log(this.typeForm)
      });
  }

  onSubmit(event: Event, settingsId: any) {
    event.preventDefault(); 
    if (this.typeForm.valid) {
      this.spinner.show() 
      this.service.updateToUrl(`${API.CLAIMS}commission-settings/${settingsId}`, this.typeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
        this.settingAdded.emit();
        this.closeModal();
      });
    }
  }

  
  showModal(settingsId: any) {
    const modalOptions: ModalOptions = {
      onShow: () => {
        this.getSetting(settingsId); 
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
