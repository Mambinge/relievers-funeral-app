import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.css']
})
export class PayoutsComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  payout!: any[]
  clientsId:any
  id:any
  @Input() policyNumber:any
  accountId:any
  claimId:any;

  constructor(private route: ActivatedRoute, private service: ApiService, private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
    this.route.params.subscribe(params => {
      this.accountId = params['id'];
      this.claimId = params['claimId'];
      console.log('Account ID:', this.accountId);
      this.getAll(this.claimId)
    }); }

  getAll(claimId:number){
    // this.spinner.show();http://192.168.12.134:8990/payments/payouts?page=0&size=1&clientId=3
    this.service.getAll(`${API.PAYMENTS}payments/payouts?&page=${this.currentPage}&size=7&claimId=${claimId}`).subscribe((res)=>{
      this.products = res.content
      this.spinner.hide();
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(this.accountId);
    }
  }

  deletepayout(id: string) {
    this.service.delete(`${API.PAYMENTS}payout/${id}`).subscribe((res) => {
      this.getAll(this.accountId);
    });
  }

  viewpayout(id: string) {
    this.router.navigate(['/view-payouts', id]);
  }

  onpayoutAdded() {
    this.getAll(this.accountId);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}


