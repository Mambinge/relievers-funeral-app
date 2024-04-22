import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-view-planner',
  templateUrl: './view-planner.component.html',
  styleUrls: ['./view-planner.component.css']
})
export class ViewPlannerComponent {
  plan:any
  plans: any
  selectedPlan: any;
  selectedTab: string = 'plan';

  showPlanDetails(plan: any) {
    this.selectedPlan = plan;
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
    })
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
