import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gender, Nationality, Title } from '../model/accounts';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Settings } from 'src/app/models/policy-status';

@Component({
  selector: 'app-add-personal-details',
  templateUrl: './add-personal-details.component.html',
  styleUrls: ['./add-personal-details.component.css']
})
export class AddPersonalDetailsComponent {
  @Output() output = new EventEmitter<any>();
  genderOptions = Object.values(Gender);
  nationalityOptions = Object.values(Nationality);
  titleOptions = Object.values(Title);
  policyOptions! :any[]
  planOptions! : any[]
  selectedPolicy: any;
  selectedPlan: any;
  selectedPremium:any;
  filteredPlans: any[] = [];
  filteredPremium: any[] =[];
  filteredAmount:any
  accountsForm!: FormGroup
  currentStep = 0;
  data:any
  accountsId:any;
  accounts:any
  formData:any
  selectedPolicyId:any
  selectedPlanId:any
  selectedPremiumId:any;
  accountTypeOptions = Object.values(Settings);
  agentOptions! :any[]
  selectedAgentId: any;
  selectedAgent: any;

  constructor(private fb: FormBuilder, private http: ApiService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private alert: AlertService) {

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
        title: '',
        name: '',
        surname: '',
        gender: '',
        nationality: '',
        idNumber: '',
        dateOfBirth: '',
        sourceOfIncome: '',
        agentId:'',
        accountType:'',
        plan: {
          id: '',
          name: '',
          premiums: {
            name: '',
            amount: 0 
          }
        }
      });



    this.http.getFromUrl(`${API.SERVICE}policies`)
    .subscribe((res) => {
      this.policyOptions = res.content
    });

    this.http.getFromUrl(`${API.SERVICE}plan`)
    .subscribe((res) => {
      this.planOptions = res.content
    });

    this.http.getFromUrl(`${API.SERVICE}policies`)
    .subscribe((res) => {
      this.policyOptions = res.content
    });

    this.http.getFromUrl(`${API.CLIENTS}agents`)
    .subscribe((res) => {
      this.agentOptions = res.content
    });
    
  }
onAgentChange(event: any) {
  const agentId = event?.target?.value;
  if (agentId) {
    this.selectedAgentId = Number(agentId); // Ensure it's a number
    this.accountsForm.patchValue({ agentId: this.selectedAgentId }); // Update the form control
  }
}

  onPolicyChange(event: any) {
    const policyId = event?.target?.value; 
    if (policyId) { 
      this.selectedPolicyId = policyId;
      this.selectedPolicy = this.policyOptions.find(policy => policy?.id);
      if (this.selectedPolicy) {
        console.log(this.selectedPolicy)
        this.filteredPlans = this.selectedPolicy.plans;

      } else {
        this.filteredPlans = [];
      } 
    }
  }

  onPlanChange(event:any){
    const planId = event?.target?.value; 
    if (planId) { 
      this.selectedPremiumId = planId;
      this.selectedPremium = this.planOptions.find(plan => plan?.id);
      if (this.selectedPremium) {
        this.filteredPremium = this.selectedPremium.premiums;
        console.log( this.filteredPremium)

        this.filteredAmount = this.selectedPremium.premiums.amount
        console.log( this.filteredAmount)
                this.accountsForm.patchValue({
            premiums: {
              amount: this.selectedPremium.premiums.amount
            }
          
        });
      } else {
        this.filteredPremium = [];
      } 
    }
  }
  
  

  getAccount(accountsId:any){
    this.http.getFromUrl(`${API.CLIENTS}clients/${accountsId}`)
    .subscribe(x => this.accountsForm.patchValue(x))

  }

  nextStep(event: Event) {
    event.preventDefault(); 
    if (this.accountsForm.valid) { 
      // this.spinner.show()
console.log(this.accountsForm)
      const selectedPlan = this.accountsForm.value.plan;
      const selectedPremiumName = this.accountsForm.value.plan.premiums && this.accountsForm.value.plan.premiums.length > 0 ? this.accountsForm.value.plan.premiums[0].name : '';
      const selectedAmount = this.accountsForm.value.plan.premiums && this.accountsForm.value.plan.premiums.length > 0 ? this.accountsForm.value.plan.premiums[0].amount : 0;      
      const selectedPlanId = selectedPlan.id; 
      const selectedPlanName = selectedPlan.name; 
      // const selectedPremiumName = selectedPremium.name; 
      // const selectedPremiumNames = selectedPremium.map((premium: { name: any; }) => premium.name); // Extracting all premium names
      const requestBody = {
        title: this.accountsForm.value.title,
        name: this.accountsForm.value.name,
        surname: this.accountsForm.value.surname,
        gender: this.accountsForm.value.gender,
        nationality: this.accountsForm.value.nationality,
        idNumber: this.accountsForm.value.idNumber,
        dateOfBirth: this.accountsForm.value.dateOfBirth,
        sourceOfIncome: this.accountsForm.value.sourceOfIncome,
        agentId:this.accountsForm.value.agentId,
        accountType: this.accountsForm.value.accountType,

        plan: {
          id: selectedPlanId,
          name: selectedPlanName,
          premiums: {
            name: selectedPremiumName,
            amount: selectedAmount 
          }
          // premiums: selectedPremiumNames.map((name: any) => ({ name, amount: 0 })) 
        }
      };
        this.output.emit(requestBody)
        console.log(requestBody)
        this.spinner.hide()

    }
  }


 
}
