import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-view-account-approval',
  templateUrl: './view-account-approval.component.html',
  styleUrls: ['./view-account-approval.component.css']
})
export class ViewAccountApprovalComponent {
  accounts:any;
  account:any
  selectedTab: string = 'approval stage';
  currentPage = 0;
  accountId:any
  workflowData:any
  workFlow:any
  approvalData:any
  approvals:any
  approvalName:any
  approvalOrder:any
  currentStep = 0;
  sortedApprovalStages!: any[];

  constructor(private route: ActivatedRoute, private service: ApiService){}

  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accounts = this.getAccount(accountsId);
      this.workflowData = this.getWorkflow(accountsId)
      this.approvalData = this.getApprovals(accountsId) 

      this.accountId = accountsId
    });
  //  this.sortedApprovalStages = this.account.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
}

getApprovals(accountsId: any) {
  this.service.getFromUrl(`${API.CLIENTS}account-approval?page=0&size=1000&accountId=${accountsId}`).subscribe((res) => {
    this.approvals = res.content;
    console.log(this.approvals);

    if (Array.isArray(this.approvals)) {
      this.approvalName = this.approvals.map(approval => approval.workFlowStage);
      this.approvalOrder = this.approvals.map(approval => approval.workFlowStage.order)
      console.log(this.approvalName);
    }
  });
}


  getAccount(accountsId:any){
    this.service.getFromUrl(`${API.CLIENTS}clients/${accountsId}`).subscribe((res) => {
      this.account = res
      console.log(this.account)
    })
  }
  getWorkflow(accountsId:any){
    this.service.getFromUrl(`${API.CLIENTS}account-approval?page=0&size=1&accountId=${accountsId}`).subscribe((res) => {
      this.workFlow = res.content[0]
    })

  }
  approvalAdded(){
    this.getAccount(this.accountId)
    this.getApprovals(this.accountId)
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  
  onClick(){

  }
  
  }









