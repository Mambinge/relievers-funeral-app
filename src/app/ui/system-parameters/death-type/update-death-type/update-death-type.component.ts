import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Status } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-death-type',
  templateUrl: './update-death-type.component.html',
  styleUrls: ['./update-death-type.component.css']
})
export class UpdateDeathTypeComponent {
  deathTypeForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Input() deathTypesId!: string;
  deathType:any
  
  constructor(private spinner: NgxSpinnerService,private alert: AlertService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const deathTypeId = params['id'];
      this.deathTypesId = deathTypeId
      this.deathType = this.getdeathType(deathTypeId);
    });

    this.deathTypeForm = this.fb.group({
      name: '',
      description: '',
    });
  }

  getdeathType(deathTypeId:any){
      this.service.getFromUrl(`${API.CLAIMS}type/${deathTypeId}`).pipe(first())
        .subscribe(x => this.deathTypeForm.patchValue(x));
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.deathTypeForm.valid) {
      this.spinner.show() 
      this.service.updateToUrl(`${API.SERVICE}type/${this.deathTypesId}`, this.deathTypeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.alert.showSuccess("Updated Successfully")
        this.router.navigate(['/death-types']);
      });
    }
  }

}
