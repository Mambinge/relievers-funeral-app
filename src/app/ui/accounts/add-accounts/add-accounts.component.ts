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
  data:any;

constructor(private fb: FormBuilder, private http: ApiService, private router: Router,
  private spinner: NgxSpinnerService,private alert: AlertService){

}

  ngOnInit(){
    // this.http.getFromUrl(`${API.SERVICE}policies`)
    // .subscribe((res)=>{
    //   this.planOptions = res.content
    //   console.log(this.planOptions)
    // });


   
  }



  backPress(event:any) {
    if (this.current > 0) this.current--;
  
  }
  
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    }

    setAccount(account: Accounts, name: string) {
      this.personalDetails = account;
      console.log(this.personalDetails)
      if (this.currentStep < 3) {
      this.currentStep++;
    } 
   }

    setContactDetails(contract:any) {
    this.contactDetails = contract
   
    if (this.currentStep < 3) {
      this.currentStep++;
    }  
   }
   setBankDetails(contract:any) {
    this.bankDetails = contract 
    this.onSubmit(this.bankDetails)
   }

   onSubmit(event:any){
          this.spinner.show()

    const personalDetails = this.personalDetails
    const contactDetails = this.contactDetails 
    const bankDetails = this.bankDetails

    const requestBody = {
      title: personalDetails.title,
      name: personalDetails.name,
      surname: personalDetails.surname,
      gender: personalDetails.gender,
      nationality: personalDetails.nationality,
      idNumber: personalDetails.idNumber,
      dateOfBirth: personalDetails.dateOfBirth,
      sourceOfIncome: personalDetails.sourceOfIncome,
      plan: {
        id: personalDetails.plan.id,
        name: personalDetails.plan.name
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
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.router.navigate(['/accounts']);
      })

   
   }
}
