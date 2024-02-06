import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API, ApiService } from 'src/app/shared/services';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css']
})
export class ViewAccountsComponent {
  selectedTab: string = 'personal';
  accounts:any
  account:any

  constructor(private route: ActivatedRoute, private request: ApiService) {}

  ngOnInit() {
    initFlowbite();
    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accounts = this.getAccount(accountsId);
      initFlowbite();
    });
  }

  getAccount(accountsId:any){
    this.request.getFromUrl(`${API.CLIENTS}clients/${accountsId}`).subscribe((res) => {
      this.account = res
      console.log(this.account)
    })
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }



  }

