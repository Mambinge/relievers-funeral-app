import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-work-flow',
  templateUrl: './update-work-flow.component.html',
  styleUrls: ['./update-work-flow.component.css']
})
export class UpdateWorkFlowComponent {
  workFlowForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  workFlow:any;
  workFlowData:any
  @Input() workFlowId!: any;

  constructor(private spinner: NgxSpinnerService, private alert: AlertService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  }
  
 

  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const workFlowId = +params['id'];
      this.workFlowId = workFlowId
      this.workFlow = this.fetchworkFlow(workFlowId);
    });

    this.workFlowForm = this.fb.group({
      name: '',
      type:'',
      description: '',
      status: ''
    });
    }



  fetchworkFlow(workFlowId:number) {
    if (this.workFlowId) {
      this.service.getFromUrl(`${API.SERVICE}workflows/${this.workFlowId}`).subscribe(x => this.workFlowForm.patchValue(x));
    }
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.workFlowForm.valid) { 
      this.spinner.show()
      this.service.updateToUrl(`${API.SERVICE}workflows/${this.workFlowId}`, this.workFlowForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
        this.router.navigate(['/work-flows']);
      });
    }
  }

}
