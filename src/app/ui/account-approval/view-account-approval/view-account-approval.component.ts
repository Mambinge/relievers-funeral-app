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

  currentStep = 0;
  sortedApprovalStages!: any[];
  constructor(private route: ActivatedRoute, private service: ApiService){}

  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accounts = this.getAccount(accountsId);
      this.workflowData = this.getWorkflow(accountsId)
      this.accountId = accountsId
    });
   console.log(this.accountId)
   console.log(this.accounts)
  //  this.sortedApprovalStages = this.account.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
    
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
      console.log(this.workFlow)
    })

  }
  approvalAdded(){
    this.getAccount(this.accountId)
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  
  onClick(){

  }
  
  }









