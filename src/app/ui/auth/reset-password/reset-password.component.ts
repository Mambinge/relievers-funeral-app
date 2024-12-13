import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from 'src/app/shared/guard/auth-guard';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  confirmPassword: string = '';
  password: string = '';
  email!: string;
  uniqueId!: string;
  typeForm!: FormGroup;
  data:any;

  constructor(private request: HttpClient,private router: Router, private spinner: NgxSpinnerService,private alert: AlertService,    private route: ActivatedRoute,
    private guard: AuthGuard, private service: ApiService, private fb: FormBuilder,){
      this.route.params.subscribe((params) => {
        this.email = params['email'];
        this.uniqueId = params['uniqueId'];
      });
  
    
      this.typeForm = this.fb.group({
      confirmPassword:  '',
      password: '',
      token: [this.uniqueId],
      username: [this.email],

        });
  }



  onClick(event: Event) {
    event.preventDefault();
    if (this.typeForm.valid) {
      this.spinner.show();
      console.log(this.typeForm.value);
      this.request.post(`${API.AUTH}auth/reset-password?username=${this.typeForm.value.username}`, {...this.typeForm.value}, {
        observe: 'response',
      }).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.alert.showSuccess(res.body.message, 'Success');
          } else {
            this.alert.showError('Error', res.error.error.message);
          }
          this.spinner.hide();
        },
        error: (error: any) => {
          console.log(error);
          const errorMessage = error.error?.message || 'An unexpected error occurred.';
          this.alert.showError('Error', errorMessage);
          this.spinner.hide();
        }
      });
    }
  }
  }
