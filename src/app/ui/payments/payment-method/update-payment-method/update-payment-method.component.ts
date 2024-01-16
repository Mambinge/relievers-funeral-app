import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-update-payment-method',
  templateUrl: './update-payment-method.component.html',
  styleUrls: ['./update-payment-method.component.css']
})
export class UpdatePaymentMethodComponent {
  paymentMethodForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  paymentMethod:any;
  paymentMethodData:any
  @Input() paymentMethodId!: string;
  
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

 
  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const paymentMethodId = +params['id'];
      this.paymentMethod = this.fetchpaymentMethod(paymentMethodId);

    });

    this.paymentMethodForm = this.fb.group({
      name: '',
      description: '',
      status: ''
    });
    }



  fetchpaymentMethod(paymentMethodId:number) {
    if (paymentMethodId) {
      this.service.getFromUrl(`payment-methods/${paymentMethodId}`).subscribe(x => this.paymentMethodForm.patchValue(x));
    }
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.paymentMethodForm.valid) { 
      this.spinner.show()
      this.service.updateToUrl(`payment-methods/${this.paymentMethodId}`, this.paymentMethodForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.router.navigate(['/payment-method']);
      });
    }
  }

}
