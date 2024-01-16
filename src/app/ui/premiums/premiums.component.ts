import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-premiums',
  templateUrl: './premiums.component.html',
  styleUrls: ['./premiums.component.css']
})
export class PremiumsComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any

  constructor(private spinner: NgxSpinnerService,private service: ApiService, private router: Router){}


  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`premiums?page=${this.currentPage}&size=10`).subscribe((res)=>{
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

  deletePremium(id: string) {
    this.service.delete(`premiums/${id}`).subscribe((res) => {
      this.getAll()
    });
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-premiums', id]);
  }

  onPlanAdded() {
    this.getAll();
  }
}
