import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-plan-premiums',
  templateUrl: './plan-premiums.component.html',
  styleUrls: ['./plan-premiums.component.css']
})
export class PlanPremiumsComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  plan:any

  constructor( private route: ActivatedRoute,private spinner: NgxSpinnerService,private service: ApiService, private router: Router){}


  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const planId = params['id'];
      this.plan = +planId

    });
    this.getAll(false)
  }

  getAll(reload: boolean, _$event?: Event){
    this.service.getFromUrl(`${API.SERVICE}plan/${this.plan}`).subscribe((res) => {
      this.products = res.premiums
      console.log(this.products)
    })
  }


  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(false);
    }
  }

  deletePremium(id: string) {
    this.service.delete(`${API.SERVICE}premiums/${id}`).subscribe((res) => {
      this.getAll(false);
    });
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-premiums', id]);
  }

  onPlanAdded() {
    this.getAll(false);
  }
}
