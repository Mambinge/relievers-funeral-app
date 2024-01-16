import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-work-flow',
  templateUrl: './view-work-flow.component.html',
  styleUrls: ['./view-work-flow.component.css']
})
export class ViewWorkFlowComponent {
product:any
constructor(private route: ActivatedRoute) {
 ;
}
  ngOnInit(){

    this.route.params.subscribe((params : any) => {
      const workFlowId = +params['id'];
    });
  }
    }
