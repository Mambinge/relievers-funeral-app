import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { Unit } from 'src/app/models/units';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-death-period',
  templateUrl: './update-death-period.component.html',
  styleUrls: ['./update-death-period.component.css']
})
export class UpdateDeathPeriodComponent {
  deathPeriodForm!: FormGroup;
  units = Object.values(Unit);
  data: any
  @Input() deathPeriodsId!: any;
  deathPeriodId:any
  statusOptions = Object.values(Status);
  @Output() deathperiodAdded = new EventEmitter<void>();

  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit(){
    console.log(this.deathPeriodsId)
    // this.route.params.subscribe((params : any) => {
    //   const deathPeriodId = params['id'];
    //   console.log(deathPeriodId)
    //   this.deathPeriodsId = deathPeriodId
    //   console.log(this.deathPeriodId)

    // });
    // this.getdeathPeriod(this.deathPeriodsId);

    this.deathPeriodForm = this.fb.group({
      title: '',
      period: '',
      unit: '',
      status:''
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['deathPeriodsId'] && this.deathPeriodsId) {
  //     this.getdeathPeriod(this.deathPeriodsId);
  //   }
  // }

  getdeathPeriod(deathPeriodId: any) {
    this.service.getFromUrl(`${API.CLAIMS}period/${deathPeriodId}`).pipe(first())
      .subscribe(x => {
        console.log('Data received for patching:', x);

        this.deathPeriodForm.patchValue(x);
        console.log(this.deathPeriodForm)
      });
  }

  onSubmit(event: Event, deathPeriodsId: any) {
    event.preventDefault(); 
    if (this.deathPeriodForm.valid) {
      this.spinner.show() 
      this.service.updateToUrl(`${API.CLAIMS}period/${deathPeriodsId}`, this.deathPeriodForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
        this.deathperiodAdded.emit();
        this.closeModal();
      });
    }
  }

  
  showModal(deathPeriodsId: any) {
    const modalOptions: ModalOptions = {
      onShow: () => {
        this.getdeathPeriod(deathPeriodsId); 
      },
    };
    const instanceOptions: InstanceOptions = {
      id: 'modal',
      override: true
    };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    modal.show();
  }

  closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'modal',
    override: true
  };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    modal.hide();
  }
}
