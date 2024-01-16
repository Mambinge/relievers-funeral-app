import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services';

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

  constructor(private service: ApiService, private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
    this.getAll(false)
  }

  getAll(reload: boolean, _$event?: Event){
    this.spinner.show();
    this.service.getAll(`https://a621-68-178-203-55.ngrok-free.app/payments/payouts?page=${this.currentPage}&size=10`).subscribe((res)=>{
      this.products = res.content
      this.spinner.hide();
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(false);
    }
  }

  deletepayout(id: string) {
    this.service.delete(`payout/${id}`).subscribe((res) => {
      this.getAll(false)
    });
  }

  viewpayout(id: string) {
    this.router.navigate(['/view-payouts', id]);
  }

  onpayoutAdded() {
    this.getAll(false);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}


