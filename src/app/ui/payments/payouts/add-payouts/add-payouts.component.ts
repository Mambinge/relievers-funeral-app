import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-add-payouts',
  templateUrl: './add-payouts.component.html',
  styleUrls: ['./add-payouts.component.css'],
})
export class AddPayoutsComponent {
  paymentMethodOptions: any[] = [];
  payoutOptions: any[] = [];
  payoutForm!: FormGroup;
  claimOptions: any[] = [];
  statusOptions = Object.values(Status);
  data: any;
  isAddMode!: boolean;
  id: any;
  @Output() payoutAdded: EventEmitter<number> = new EventEmitter<number>();
  @Input() payoutId!:  any;
  @Input() policyNumber:any
  number:any

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.policyNumber);
    this.number = this.policyNumber

    // this.isAddMode = !this.id;

    this.payoutForm = this.fb.group({
      claimId: this.policyNumber,
      paymentMethodId: '',
      amount: '',
      balance: '',
      paymentDate: '',
      paymentReference: '',
      status: '',
      notes: '',
    });

    if (this.payoutId) {
      this.http
        .getFromUrl(`${API.PAYMENTS}payment/payouts/${this.payoutId.id}`)
        .pipe(first())
        .subscribe((x) => this.payoutForm.patchValue(x));
    }

    this.http.getFromUrl(`${API.SERVICE}payment-methods`).subscribe((res)=>{
      this.paymentMethodOptions = res.content;
    })

    this.getClaims()
  }

  getClaims(){
    this.http.getFromUrl(`${API.CLAIMS}claims`).subscribe((res)=>{
      this.claimOptions = res.content;
      console.log(this.claimOptions)
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.payoutForm.valid) {
      this.http.postToUrl(`${API.PAYMENTS}payment/payouts`, this.payoutForm.value).subscribe((res) => {
        this.data = res;
        this.payoutAdded.emit(res);
        this.closeModal();
      });
    }
  }

  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {},
    };
    const instanceOptions: InstanceOptions = {
      id: 'crud-modal',
      override: true,
    };
    const modal = new Modal(
      document.getElementById('crud-modal'),
      modalOptions,
      instanceOptions
    );
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
