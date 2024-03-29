import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import tabs from 'flowbite/lib/esm/components/tabs';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css']
})
export class ViewPolicyComponent {
  policy:any
  policies: any
  selectedPlan: any;
  selectedTab: string = 'policy';

  showPlanDetails(plan: any) {
    this.selectedPlan = plan;
  }
  constructor(private route: ActivatedRoute, private request: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const policyId = params['id'];
      this.policy = this.getPolicy(policyId);
    });
  }

  getPolicy(policyId:any){
    this.request.getFromUrl(`${API.SERVICE}policies/${policyId}`).subscribe((res) => {
      this.policies = res
      // this.user = res.permissions
    })
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
