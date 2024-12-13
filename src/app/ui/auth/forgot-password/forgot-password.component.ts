import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from 'src/app/shared/guard/auth-guard';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  username: string = '';
  typeForm!: FormGroup;
  data:any;

  constructor(private request: HttpClient,private router: Router, private spinner: NgxSpinnerService,private alert: AlertService,    private route: ActivatedRoute,
    private guard: AuthGuard, private service: ApiService, private fb: FormBuilder,){
    this.typeForm = this.fb.group({
      username: '',
    });
  }



  onClick(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show();
      console.log(this.typeForm.value);
      this.request.post(`${API.AUTH}auth/forgot-password?username=${this.typeForm.value.username}`, {...this.typeForm.value},
        {
          observe: 'response',
        }
      ).subscribe((res: any) => {
        console.log(res);
        if (res.status === 200) {
          this.alert.showSuccess(res.body.message,'Success');
        } else {
          this.alert.showError('Error', 'Failed');
        }
        this.spinner.hide();
      });
    }
  }  
}
