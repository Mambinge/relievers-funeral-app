import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-work-flows',
  templateUrl: './work-flows.component.html',
  styleUrls: ['./work-flows.component.css']
})
export class WorkFlowsComponent implements OnInit {
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
    this.service.getAll(`${API.SERVICE}workflows?page=${this.currentPage}&size=7`).subscribe((res)=>{
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

  updatePlan(id: string) {
    this.router.navigate(['/update-work-flow', id]);
  }

  deleteworkFlow(id: string) {
    this.service.delete(`${API.SERVICE}workflows/${id}`).subscribe((res) => {
      this.getAll()
    });
  }

  onworkFlowAdded() {
    this.getAll();
  }

  viewworkFlow(id: string) {
    this.router.navigate(['/view-work-flows', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

 
}
