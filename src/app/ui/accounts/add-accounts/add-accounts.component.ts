import { Component, Input, Output } from '@angular/core';
import { Accounts, Gender, Nationality } from '../model/accounts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { API, ApiService } from 'src/app/shared/services';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-accounts',
  templateUrl: './add-accounts.component.html',
  styleUrls: ['./add-accounts.component.css']
})
export class AddAccountsComponent {
  accountsForm!: FormGroup
  currentStep = 0;
  formData: any = {};
  current!: number;
  personalDetails:any
  contactDetails:any
  bankDetails:any
  files:any;
  data:any;
  accountId:any;

constructor(private fb: FormBuilder,private route: ActivatedRoute, 
  private http: ApiService, private router: Router,
  private spinner: NgxSpinnerService,private alert: AlertService){

}

ngOnInit() {
  this.route.params.subscribe(params => {
    this.accountId = params['id'];
  });
}


  
    prevStep(event:any) {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    }

    setAccount(account: Accounts, name: string) {
      this.personalDetails = account;
      console.log(this.personalDetails)
      if (this.currentStep < 4) {
      this.currentStep++;
    } 
   }

    setContactDetails(contract:any) {
    this.contactDetails = contract
   
    if (this.currentStep < 4) {
      this.currentStep++;
    }  
   }
   setBankDetails(contract:any) {
    this.bankDetails = contract 
    this.onSubmit(this.bankDetails)
   }
   setFiles(contract:any){
    this.files = contract
    this.router.navigate(['/accounts']);

   }

   onSubmit(event:any){
          this.spinner.show()

    const personalDetails = this.personalDetails
    const contactDetails = this.contactDetails 
    const bankDetails = this.bankDetails
console.log(personalDetails)
    const requestBody = {
      title: personalDetails.title,
      name: personalDetails.name,
      surname: personalDetails.surname,
      gender: personalDetails.gender,
      nationality: personalDetails.nationality,
      idNumber: personalDetails.idNumber,
      dateOfBirth: personalDetails.dateOfBirth,
      sourceOfIncome: personalDetails.sourceOfIncome,
      agentId:personalDetails.agentId,
      accountType:personalDetails.accountType,

      plan: {
        id: personalDetails.plan.id,
        name: personalDetails.plan.name,
        premiums: [{
          name: personalDetails.plan.premiums.name,
          amount: personalDetails.plan.premiums.amount,
        }]
      },
      bankDetails: {
        bank: bankDetails.bank,
        branch: bankDetails.branch,
        accountName: bankDetails.accountName,
        accountNumber: bankDetails.accountNumber
      },
      contactDetails: {
        phone: contactDetails.phone,
        email: contactDetails.email,
        address: contactDetails.address
      }
    };
   
      console.log(requestBody)

      this.http.postToUrl(`${API.CLIENTS}clients`, requestBody).subscribe((res)=>{
        this.data = res
        this.accountId = res.id
        console.log(this.accountId)
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        if (this.currentStep < 4) {
          this.currentStep++;
        } 
      })

   
   }
}
