import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.css']
})
export class ViewClaimsComponent {
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
  policyNumber:any;
  claimId:any;
  status ="APPROVED"
  data:any;
  clientAccount:any;

  constructor(private route: ActivatedRoute, private service: ApiService, private spinner: NgxSpinnerService,    
    private alert: AlertService, private router: Router,
  ){}

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
  this.service.getFromUrl(`${API.CLAIMS}claim-approval?page=0&size=1000&accountId=${accountsId}`).subscribe((res) => {
    this.approvals = res.content;
    console.log(this.approvals);

    if (Array.isArray(this.approvals)) {
      this.approvalName = this.approvals.map(approval => approval.workFlowStage);
      this.approvalOrder = this.approvals.map(approval => approval.workFlowStage.order)
      console.log(this.approvalName);
    }
  });
}

getWorkflow(accountsId:any){
  this.service.getFromUrl(`${API.CLAIMS}claim-approval?page=0&size=100&accountId=${accountsId}`).subscribe((res) => {
    this.workFlow = res.content[0]
    console.log(this.workFlow)
  })

}
  getAccount(accountsId:any){
    this.service.getFromUrl(`${API.CLAIMS}claims/${accountsId}`).subscribe((res) => {
      this.account = res
this.policyNumber = res.clientAccount.policyNumber
this.claimId = res.id
this.clientAccount = res.clientAccount.id
console.log(this.clientAccount)


      console.log(this.account)
    })
  }
  // getWorkflow(accountsId:any){
  //   this.service.getFromUrl(`${API.CLIENTS}account-approval?page=0&size=1&accountId=${accountsId}`).subscribe((res) => {
  //     this.workFlow = res.content[0]
  //   })

  // }
  approvalAdded(){
    this.getAccount(this.accountId)
    this.getApprovals(this.accountId)
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  
  approveClaim(event: Event) {
    event.preventDefault();

      const requestBody = {
        claimId: parseInt(this.claimId, 10),
        policyNumber: this.policyNumber,
        status: this.status,
        reason: '',
        workFlow: {
        id: this.account.workFlow.id,
        name: this.account.workFlow.name,
        stages: this.account.workFlow.stages,
        type: this.account.workFlow.Type

        },
        workFlowStage: {
          id: this.account?.approvalStage?.id,
          last: this.account?.approvalStage?.last,
          name: this.account?.approvalStage?.name,
          order: this.account?.approvalStage?.order

        }
      };
      console.log(this.account);
      console.log(requestBody);

      this.service
        .postToUrl(`${API.CLAIMS}claim-approval`, requestBody)
        .subscribe((res) => {
          this.data = res;
          this.spinner.hide();
          this.alert.showSuccess('Approved Successfully');
          this.getAccount(this.accountId)
        });


  }

  
  payouts(event:any){
    console.log(event)
    console.log(this.clientAccount)
    this.router.navigate(['/client-payouts', this.clientAccount, this.account.id]);  }

  }









