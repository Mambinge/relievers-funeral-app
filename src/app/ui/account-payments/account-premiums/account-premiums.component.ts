import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-account-premiums',
  templateUrl: './account-premiums.component.html',
  styleUrls: ['./account-premiums.component.css']
})
export class AccountPremiumsComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  payout!: any[]
  clientsId:any
  id:any
  @Input() policyNumber:any
  @Input() clientAccountId:any
number:any
  constructor(private service: ApiService, private route: ActivatedRoute,
     private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
    console.log(this.policyNumber)
  this.number = this.policyNumber
    this.route.params.subscribe((params : any) => {
      const clientId = params['id'];
      this.clientsId = +clientId
      if(clientId){
        this.id = this.getAll(clientId)
      }
    });
    // this.getAll(false)
  }

  getAll(clientId:any, _$event?: Event){
    // this.spinner.show();
    this.service.getAll(`${API.PAYMENTS}payments/premiums?clientId=${clientId}&page=${this.currentPage}&size=7`).subscribe((res)=>{
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
    this.getAll(this.clientsId);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}


