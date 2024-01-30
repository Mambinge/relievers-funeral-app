import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-add-bank-details',
  templateUrl: './add-bank-details.component.html',
  styleUrls: ['./add-bank-details.component.css']
})
export class AddBankDetailsComponent {
  @Output() output = new EventEmitter<any>();
  accountsForm!: FormGroup
  currentStep = 0;
  data:any
  accountsId:any;
  accounts:any
  formData:any

  constructor(private fb: FormBuilder, private http: ApiService,
    private spinner: NgxSpinnerService, private route: ActivatedRoute) {

  } 

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accountsId = accountsId
      if(accountsId){
      this.accounts = this.getAccount(accountsId);
    }
    });

    this.accountsForm = this.fb.group({
    bank: '',
    branch: '',
    accountName: '',
    accountNumber: ''
    });
  }


  getAccount(accountsId:any){
    this.http.getFromUrl(`${API.CLIENTS}clients/${accountsId}`)
    .subscribe(x => this.accountsForm.patchValue(x.bankDetails))

  }
  nextStep(event: Event) {
    // event.preventDefault(); 
    // if (this.accountsForm.valid) { 
      this.spinner.show()
        this.output.emit(this.accountsForm.value)
        console.log(this.accountsForm.value)
        this.spinner.hide()

    // }
  }


 
}
