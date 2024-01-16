import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/models/policy-status';
import { ApiService } from 'src/app/shared/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-premiums',
  templateUrl: './update-premiums.component.html',
  styleUrls: ['./update-premiums.component.css']
})
export class UpdatePremiumsComponent {
  premiumsForm!: FormGroup;
  statusOptions = Object.values(Status);
  data: any
  @Input() premiumId!: string;
  planOptions: any[] = [];
  premium:any

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private service: ApiService) {
  } 

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const premiumId = params['id'];
      this.premiumId = premiumId
      this.premium = this.getPremium(premiumId);
    });

    this.premiumsForm = this.fb.group({
      name: '',
      description: '',
      status: '',
      premiumId:'',
      amount:''
    });

    this.service.getAll('plan').subscribe((data) => {
      this.planOptions = data.content;
    });
  }

getPremium(premiumId:any){
  this.service.getFromUrl(`premiums/${premiumId}`).pipe(first())
  .subscribe(x => this.premiumsForm.patchValue(x))

}
  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.premiumsForm.valid) { 
      this.spinner.show()
      this.service.updateToUrl(`premiums/${this.premiumId}`, this.premiumsForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide()
        this.router.navigate(['/premiums']);

      });
    }
  }


}
