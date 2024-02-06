import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gender, Nationality, Title } from '../model/accounts';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

declare var Datepicker: any;

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
  planOptions! :any[]
  accountsForm!: FormGroup
  currentStep = 0;
  data:any
  accountsId:any;
  accounts:any
  formData:any

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
      plan: {
        id:'',
        name: ''
              }
      });

    this.http.getFromUrl(`${API.SERVICE}policies`)
    .subscribe((res)=>{
      this.planOptions = res.content.map((plan: any) => ({ id: plan.id, name: plan.name }));
      console.log(this.planOptions)
    });


  }


  getAccount(accountsId:any){
    this.http.getFromUrl(`${API.CLIENTS}clients/${accountsId}`)
    .subscribe(x => this.accountsForm.patchValue(x))

  }

  nextStep(event: Event) {
    event.preventDefault(); 
    if (this.accountsForm.valid) { 
      this.spinner.show()

      const selectedPlan = this.accountsForm.value.plan;
      const selectedPlanId = selectedPlan.id; 
      const selectedPlanName = selectedPlan.name; 

      const requestBody = {
        title: this.accountsForm.value.title,
        name: this.accountsForm.value.name,
        surname: this.accountsForm.value.surname,
        gender: this.accountsForm.value.gender,
        nationality: this.accountsForm.value.nationality,
        idNumber: this.accountsForm.value.idNumber,
        dateOfBirth: this.accountsForm.value.dateOfBirth,
        sourceOfIncome: this.accountsForm.value.sourceOfIncome,
        plan: {
          id: selectedPlanId,
          name: selectedPlanName 
        }
      };
        this.output.emit(requestBody)
        console.log(requestBody)
        this.spinner.hide()

    }
  }


 
}
