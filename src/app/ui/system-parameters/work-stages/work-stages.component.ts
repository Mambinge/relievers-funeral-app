import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-work-stages',
  templateUrl: './work-stages.component.html',
  styleUrls: ['./work-stages.component.css']
})
export class WorkStagesComponent {
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
    this.service.getAll(`workflow-stages?page=${this.currentPage}&size=8`).subscribe((res)=>{
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

  deleteworkFlow(id: string) {
    this.service.delete(`workflow-stages/${id}`).subscribe(() => {
      this.getAll();
    });
  }
  
  updatePlan(id: string) {
    this.router.navigate(['/update-work-stage', id]);
  }
  onworkFlowAdded() {
    this.getAll();
  }

  viewworkFlow(id: string) {
    this.router.navigate(['/view-workFlow', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
