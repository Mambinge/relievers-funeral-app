import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-view-work-flow',
  templateUrl: './view-work-flow.component.html',
  styleUrls: ['./view-work-flow.component.css']
})
export class ViewWorkFlowComponent {
  workFlow:any
  @Output() workFlows: any
  stages:any

  constructor(private route: ActivatedRoute, private request: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      const workFlowId = params['id'];
      this.workFlow = this.getWorkFlow(workFlowId);
    });
  }

  getWorkFlow(workFlowId:any){
    this.request.getFromUrl(`${API.SERVICE}workflows/${workFlowId}`).subscribe((res) => {
      this.workFlows = res
      this.stages = res.stages
      this.stages= this.stages.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
      console.log(this.workFlows)
    })
  }

  onworkFlowAdded() {
    // this.getAll();
  }

  trackByFn(index: number, item: any): any {
    return item.id; // Replace 'id' with the actual unique identifier property of each stage object
  }
}
