import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';
import { Accounts } from '../accounts/model/accounts';

@Component({
  selector: 'app-account-approval',
  templateUrl: './account-approval.component.html',
  styleUrls: ['./account-approval.component.css']
})
export class AccountApprovalComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  account!: Accounts[]

  constructor(private service: ApiService, private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
    this.getAll(false)
  }

  getAll(reload: boolean, _$event?: Event){
    this.spinner.show();
    this.service.getAll(`${API.CLIENTS}clients?page=${this.currentPage}&size=7`).subscribe((res)=>{
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

  deleteaccount(id: string) {
    this.service.delete(`clients/${id}`).subscribe((res) => {
      this.getAll(false)
    });
  }

  viewAccount(id: string) {
    this.router.navigate(['/view-account-approval', id]);
  }

  updateAccount(id: string) {
    this.router.navigate(['/update-accounts', id]);
  }

  onaccountAdded() {
    this.getAll(false);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

  openAccount() {
    this.router.navigate(['/open-account']);

  }
}


