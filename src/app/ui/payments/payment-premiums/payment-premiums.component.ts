import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-payment-premiums',
  templateUrl: './payment-premiums.component.html',
  styleUrls: ['./payment-premiums.component.css']
})
export class PaymentPremiumsComponent {
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
    // this.spinner.show();
    this.service.getAll(`${API.PAYMENTS}payments/premiums?page=${this.currentPage}&size=8`).subscribe((res)=>{
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
    this.service.delete(`${API.PAYMENTS}payout/${id}`).subscribe((res) => {
      this.getAll(false)
    });
  }

  viewpayout(id: string) {
    this.router.navigate(['/view-payment-premiums', id]);
  }

  onpayoutAdded() {
    this.getAll(false);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}


