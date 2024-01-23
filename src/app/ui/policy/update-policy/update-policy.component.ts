import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-policy',
  templateUrl: './update-policy.component.html',
  styleUrls: ['./update-policy.component.css']
})
export class UpdatePolicyComponent {
  policyForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  policy:any;
  policyData:any
  // @Input() policyId!: any;
  policyId:any

  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 


  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const policyId = params['id'];
      this.policyId = policyId
      this.policy = this.getPolicy(policyId);
    });

    this.policyForm = this.fb.group({
      name: [''], // Set initial value here
      description: [''],
      status: ['']
    });
  }

  getPolicy(policyId:any){
    this.service.getFromUrl(`${API.SERVICE}policies/${policyId}`)
    .subscribe(x => this.policyForm.patchValue(x))
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if ('policyId' in changes) {
      this.fetchPolicy(this.policyId);
    }
  }




    fetchPolicy(policyId:number) {
      if (this.policyId) {
        this.service.getFromUrl(`${API.SERVICE}policies/${policyId}`).subscribe((res) => {
          this.policyData = res;
          this.policyForm.patchValue({
            name: this.policyData.name,
            description: this.policyData.description,
            status: this.policyData.status
          });            
        });
      }
    }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.policyForm.valid) { 
      this.spinner.show()
      this.service.updateToUrl(`${API.SERVICE}policies/${this.policyId}`, this.policyForm.value).subscribe((res) => {
        this.data = res;
        this.alert.showSuccess("Updated Successfully")
        this.spinner.hide()
        this.router.navigate(['/policies']);
      });
    }
  }

  
}
