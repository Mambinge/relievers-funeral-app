import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private router: Router, private authService: AuthService) {} 

  logout() {
    this.authService.clearToken(); 
    this.router.navigate(['/']); 
  }
}
