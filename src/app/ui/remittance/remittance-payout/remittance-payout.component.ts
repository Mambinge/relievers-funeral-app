import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-remittance-payout',
  templateUrl: './remittance-payout.component.html',
  styleUrls: ['./remittance-payout.component.css']
})
export class RemittancePayoutComponent {
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  id:any;
  agents: any;

  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute,
    private service: ApiService, private router: Router){}


  ngOnInit(){

    this.getAll(false)  }

  getAll(reload: boolean){
    this.spinner.show()
    this.service.getAll(`${API.CLIENTS}remittances/payouts?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.agents = res.content
      this.spinner.hide()
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(false);
    }
  }


  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

  onpayAdded() {
    this.getAll(false);
  }
}
