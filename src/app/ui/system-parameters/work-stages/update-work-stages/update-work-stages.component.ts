import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-update-work-stages',
  templateUrl: './update-work-stages.component.html',
  styleUrls: ['./update-work-stages.component.css']
})
export class UpdateWorkStagesComponent {
  workFlowForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  workFlow:any;
  workFlowData:any
  @Input() workFlowId!: any;
  workFlowOptions: any[] = [];
  workId:any
  work:any

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const workId = params['id'];
      this.workId = workId
      this.work = this.fetchworkFlow(workId);
    });

    this.workFlowForm = this.fb.group({
      workFlowId: '',
      name: '',
      order: '',
      requiredRoles: '',
      requiredPermissions: '',
      status: '' 
    });
    
    this.service.getAll('workflows').subscribe((data) => {
      this.workFlowOptions = data.content;
    });
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if ('workFlowId' in changes) {
      this.fetchworkFlow(this.workFlowId);
    }
  }




    fetchworkFlow(workFlowId:number) {
      if (workFlowId) {
        this.service.getFromUrl(`policies/${workFlowId}`).subscribe((res) => {

          this.workFlowData = res;
          this.workFlowForm.patchValue({
            name: this.workFlowData.name,
            description: this.workFlowData.description,
            status: this.workFlowData.status
          });            

        });
      }
    }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.workFlowForm.valid) { 
      this.spinner.show() 
      this.service.updateToUrl(`workflow-stages/${this.workFlowId}`, this.workFlowForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.router.navigate(['/work-flows-stage']);
      });
    }
  }

 
}
