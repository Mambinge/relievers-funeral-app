import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.css']
})
export class PaymentSettingsComponent implements OnInit {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any

  constructor(private service: ApiService,private spinner: NgxSpinnerService, private router: Router){}


  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`${API.SERVICE}payment-settings?page=${this.currentPage}&size=7`).subscribe((res)=>{
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

  deletepaymentSettings(id: string) {
    this.service.delete(`${API.SERVICE}payment-settings/${id}`).subscribe((res) => {
      this.getAll()
    });
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-payment-settings', id]);
  }

  onpaymentSettingsAdded() {
    this.getAll();
  }

  viewpaymentSettings(id: string) {
    this.router.navigate(['/view-paymentSettings', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}

