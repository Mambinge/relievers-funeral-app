import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any

  constructor(private router: Router, private spinner: NgxSpinnerService,private service: ApiService){}


  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`${API.AUTH}users?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.products = res.content
      this.spinner.hide()
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll();
    }
  }

  deleteRiders(id: string) {
    this.service.delete(`${API.AUTH}users/${id}`).subscribe((res) => {
      this.getAll()
    });
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-users', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

  onPlanAdded() {
    this.getAll();
  }
}
