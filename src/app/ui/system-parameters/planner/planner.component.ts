import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  plan!: Plan[]
  policy:any
  policies:any

  constructor(private service: ApiService, private router: Router,
      private spinner: NgxSpinnerService,){}


  ngOnInit(){

    this.getAll()
  }


  

  getAll(){
    this.spinner.show();
    this.service.getAll(`${API.SERVICE}plan?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.products = res.content
      this.spinner.hide();
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll();
    }
  }

  deletePlan(id: string) {
    this.service.delete(`${API.SERVICE}plan/${id}`).subscribe((res) => {
      this.getAll()
    });
  }

  viewPlan(id: string) {
    this.router.navigate(['/view-plan', id]);
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-plans', id]);
  }

  onPlanAdded() {
    this.getAll();
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