import { Component } from '@angular/core';
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
  selectedTab: string = 'workflow stage';
  currentPage = 0;

  constructor(private route: ActivatedRoute, private service: ApiService){}

  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accounts = this.getAccount(accountsId);
    });

  }

  getAccount(accountsId:any){
    this.service.getFromUrl(`${API.CLIENTS}account-approval?page=${this.currentPage}&size=1&accountId=${accountsId}`).subscribe((res) => {
      this.account = res
      console.log(this.account)
    })
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  
  onClick(){

  }
  
  }









