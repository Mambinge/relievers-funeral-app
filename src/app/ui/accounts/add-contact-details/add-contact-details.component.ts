import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService, API } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-contact-details',
  templateUrl: './add-contact-details.component.html',
  styleUrls: ['./add-contact-details.component.css']
})
export class AddContactDetailsComponent {
  @Output() output = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  @Input() personalDetails! :any
  contactForm!: FormGroup
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
    
    this.contactForm = this.fb.group({
      phone: '',
      email: '',
      address: ''
    });
  }

  getAccount(accountsId:any){
    this.http.getFromUrl(`${API.CLIENTS}clients/${accountsId}`)
    .subscribe(x => this.contactForm.patchValue(x.contactDetails))

  }


  submit(event: Event) {
      this.spinner.show()
        this.output.emit(this.contactForm.value)
        this.spinner.hide()
  }

 back(){
  this.currentStep = 0;
  this.cancel.emit()

 }
 
}
