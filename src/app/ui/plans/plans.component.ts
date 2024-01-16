import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  plan!: Plan[]

  constructor(private service: ApiService, private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
    this.getAll(false)
  }

  getAll(reload: boolean, _$event?: Event){
    this.spinner.show();
    this.service.getAll(`plan?page=${this.currentPage}&size=10`).subscribe((res)=>{
      this.products = res.content
      this.spinner.hide();
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(false);
    }
  }

  deletePlan(id: string) {
    this.service.delete(`plan/${id}`).subscribe((res) => {
      this.getAll(false)
    });
  }

  viewPlan(id: string) {
    this.router.navigate(['/view-plans', id]);
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-plans', id]);
  }

  onPlanAdded() {
    this.getAll(false);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}


export interface Plan{
  id:number,
  name: string,
  description: string,
  status: string,
  policyId:number
}