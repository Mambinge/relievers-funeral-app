import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-update-payment-settings',
  templateUrl: './update-payment-settings.component.html',
  styleUrls: ['./update-payment-settings.component.css']
})
export class UpdatePaymentSettingsComponent {  
paymentSettingsForm!: FormGroup;
statusOptions = Object.values(Status);
data: any
paymentSettings:any;
paymentSettingsData:any
@Input() paymentSettingsId!: string;

constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
  private router: Router, private fb: FormBuilder, private service: ApiService) {
} 


ngOnInit(){
  this.route.params.subscribe((params : any) => {
    const paymentSettingsId = +params['id'];
    this.paymentSettings = this.fetchpaymentSettings(paymentSettingsId);

  });

  this.paymentSettingsForm = this.fb.group({
    name: '',
    description: '',
    status: ''
  });
  }



fetchpaymentSettings(paymentSettingsId:number) {
  if (paymentSettingsId) {
    this.service.getFromUrl(`payment-settings/${paymentSettingsId}`).subscribe(x => this.paymentSettingsForm.patchValue(x))
  }
  
}

onSubmit(event: Event) {
  event.preventDefault(); 
  if (this.paymentSettingsForm.valid) {
    this.spinner.show() 
    this.service.updateToUrl(`payment-settings/${this.paymentSettingsId}`, this.paymentSettingsForm.value).subscribe((res) => {
      this.data = res;
      this.spinner.hide()
      this.router.navigate(['/payment-settings']);
  });
  }
}


}
