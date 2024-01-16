import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';
import { first } from 'rxjs/operators';
import { Plan } from '../plans.component';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit {
  planOptions: any[] = [];
  planForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() planAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() planId!: Plan | any;

  constructor(private fb: FormBuilder, private http: ApiService, private route: ActivatedRoute,) {

  } 


  ngOnInit() {
    console.log(this.planId)
 
    // this.isAddMode = !this.id;

    this.planForm = this.fb.group({
      name: '',
      description: '',
      status: '',
      policyId:''
    });

    if (this.planId) {
      this.http.getFromUrl(`plan/${this.planId.id}`).pipe(first())
      .subscribe(x => this.planForm.patchValue(x));
    }

    this.http.getFromUrl(`policies`)
    .subscribe((res)=>{
      this.planOptions = res.content
    });

  }


  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.planForm.valid) { 
      this.http.postToUrl('plan', this.planForm.value).subscribe((res) => {
        this.data = res;
        this.planAdded.emit(res);
        this.closeModal();
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
