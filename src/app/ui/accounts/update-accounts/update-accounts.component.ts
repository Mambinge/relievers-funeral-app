import { Component } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import {  Accounts } from '../model/accounts';

@Component({
  selector: 'app-update-accounts',
  templateUrl: './update-accounts.component.html',
  styleUrls: ['./update-accounts.component.css']
})
export class UpdateAccountsComponent {
  currentStep = 0;
  formData: any = {};
  current!: number;
  personalDetails:any
  contactDetails:any
  bankDetails:any
  data:any;
  accountsId:any;
  accounts:any

constructor(private fb: FormBuilder, private http: ApiService, private router: Router,private route: ActivatedRoute,
  private spinner: NgxSpinnerService,private alert: AlertService){

}

  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accountsId = accountsId
      this.accounts = this.getAccount(accountsId);
      console.log(this.accounts)
      console.log(this.accountsId)

    });
  }

  getAccount(accountsId:any){
    this.http.getFromUrl(`${API.CLIENTS}clients/${accountsId}`)
    .subscribe((res)=>{
      this.formData = res
    })

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

   onSubmit(accountsId:any){
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

      this.http.updateToUrl(`${API.CLIENTS}clients/${this.accountsId}`, requestBody).subscribe((res)=>{
        this.data = res
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
        this.router.navigate(['/accounts']);
      })

   
   }
}
