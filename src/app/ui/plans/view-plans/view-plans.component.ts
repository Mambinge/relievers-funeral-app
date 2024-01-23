import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrls: ['./view-plans.component.css']
})
export class ViewPlansComponent {
  plan:any
  plans: any
  selectedPremimum: any;

  showPlanDetails(plan: any) {
    this.selectedPremimum = plan;
  }
  constructor(private route: ActivatedRoute, private request: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const planId = params['id'];
      this.plan = this.getPlan(planId);
    });
  }

  getPlan(planId:any){
    this.request.getFromUrl(`${API.SERVICE}plan/${planId}`).subscribe((res) => {
      this.plans = res
      // this.user = res.permissions
    })
  }


}
