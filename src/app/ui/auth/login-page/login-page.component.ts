import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from 'src/app/shared/guard/auth-guard';
import { API, ApiService } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  typeForm!: FormGroup;
  data:any;

  constructor(private request: HttpClient, private spinner: NgxSpinnerService,private alert: AlertService,    private route: ActivatedRoute,
    private guard: AuthGuard,private router: Router, private service: ApiService, private fb: FormBuilder,){
    this.typeForm = this.fb.group({
      username: '',
      password: '',
    });
  }



  onClick(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show()  
      console.log( this.typeForm.value)
      this.request.post(`${API.AUTH}auth/sign-in`,{...this.typeForm.value},
        {
          observe: 'response',
        }
      ).subscribe((res:any) => {
        console.log(res)
        if (res.status === 200) {
          this.guard.authService.saveToken(res.body.token);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'];
          location.href = returnUrl ? returnUrl : '/dashboard';
          this.alert.showSuccess('Success', 'Logged In Successfully');
        } else {
          this.alert.showError('Error', 'Login Failed'); // Handle login failure
        }
        this.spinner.hide(); // Ensure spinner is hidden
      }, (error) => {
        this.alert.showError('Error', 'Login Failed'); // Handle error case
        this.spinner.hide(); // Ensure spinner is hidden on error
      });
    }
  }
}
