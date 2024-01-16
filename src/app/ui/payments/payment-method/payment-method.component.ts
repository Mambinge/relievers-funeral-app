import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any

  constructor(private service: ApiService, private router: Router,private spinner: NgxSpinnerService,){}


  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`payment-methods?page=${this.currentPage}&size=10`).subscribe((res)=>{
      this.products = res.content
      this.spinner.hide()
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll();
    }
  }

  deletepaymentMethod(id: string) {
    this.service.delete(`payment-methods/${id}`).subscribe((res) => {
      this.getAll()
    });
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-payment-method', id]);
  }

  onpaymentMethodAdded() {
    this.getAll();
  }

  viewpaymentMethod(id: string) {
    this.router.navigate(['/view-paymentMethod', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
