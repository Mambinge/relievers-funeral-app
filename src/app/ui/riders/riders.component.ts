import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.css']
})
export class RidersComponent {
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
    this.service.getAll(`rider?page=${this.currentPage}&size=10`).subscribe((res)=>{
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
    this.service.delete(`rider/${id}`).subscribe((res) => {
      this.getAll()
    });
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-riders', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

  onPlanAdded() {
    this.getAll();
  }
}
