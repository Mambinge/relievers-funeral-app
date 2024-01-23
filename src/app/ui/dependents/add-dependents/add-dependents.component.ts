import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Plan } from '../../plans/plans.component';

@Component({
  selector: 'app-add-dependents',
  templateUrl: './add-dependents.component.html',
  styleUrls: ['./add-dependents.component.css']
})
export class AddDependentsComponent {
  policyOptions: any[] = [];
  planOptions: any[] = [];
  dependentOptions: any[] = [];
  dependentForm!: FormGroup;
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() planAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() planId!: Plan | any;

  constructor(private fb: FormBuilder, private http: ApiService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private alert: AlertService) {

  } 


  ngOnInit() {
    console.log(this.planId)
 
    // this.isAddMode = !this.id;

    this.dependentForm = this.fb.group({
        policyHolderId: 0,
        name: '',
        surname: '',
        idNumber: '',
        relationshipToMember: '',
        plan: {
          id: 0,
          name: ''
      }
    });

    if (this.planId) {
      this.http.getFromUrl(`${API.CLIENTS}plan/${this.planId.id}`).pipe(first())
      .subscribe(x => this.dependentForm.patchValue(x));
    }

    this.http.getFromUrl(`${API.SERVICE}policies`)
    .subscribe((res)=>{
      this.policyOptions = res.content
    });

  }


  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.dependentForm.valid) { 
      this.spinner.show()
      this.http.postToUrl('plan', this.dependentForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Saved Successfully")
        this.closeModal();
        this.planAdded.emit(res);
      });
    }
  }

  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'crud-modal',
    override: true
  };
    const modal = new Modal(document.getElementById('crud-modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
