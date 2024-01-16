import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';
import { first } from 'rxjs/operators';
import { Plan } from '../plans.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent {
  planForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Input() planId!: Plan | any;
  planOptions: any[] = [];
  planOption: any[] = [];
  plan:any

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit() {
    this.service.getFromUrl(`policies`)
    .subscribe((res)=>{
      this.planOptions = res.content
      this.route.params.subscribe((params : any) => {
        const planId = params['id'];
        this.planId = planId
        this.plan = this.getPlan(planId);
      });
    });

    this.planForm = this.fb.group({
      name: '',
      description: '',
      status: '',
      policyId: ''
    });  
 
  }

  getPlan(planId:any){
    if (planId) {
      this.service.getFromUrl(`plan/${planId}`).pipe(first())
        .subscribe(x => this.planForm.patchValue(x));
    }
  }


  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.planForm.valid) { 
      this.spinner.show()
      this.service.updateToUrl(`plan/${this.planId}`, this.planForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.router.navigate(['/plans']);
      });
    }
  }

}
