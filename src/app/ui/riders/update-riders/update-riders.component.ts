import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-riders',
  templateUrl: './update-riders.component.html',
  styleUrls: ['./update-riders.component.css']
})
export class UpdateRidersComponent {
  riderForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Input() ridersId!: string;
  rider:any
  
  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const riderId = params['id'];
      this.ridersId = riderId
      this.rider = this.getRider(riderId);
    });

    this.riderForm = this.fb.group({
      name: '',
      description: '',
      status: ''
    });
  }

  getRider(riderId:any){
      this.service.getFromUrl(`rider/${riderId}`).pipe(first())
        .subscribe(x => this.riderForm.patchValue(x));
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.riderForm.valid) {
      this.spinner.show() 
      this.service.updateToUrl(`rider/${this.ridersId}`, this.riderForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
        this.router.navigate(['/riders']);
      });
    }
  }

}
