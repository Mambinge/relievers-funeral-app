import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-account-payouts',
  templateUrl: './account-payouts.component.html',
  styleUrls: ['./account-payouts.component.css']
})
export class AccountPayoutsComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  payout!: any[]
  clientsId:any
  id:any
  @Input() policyNumber:any

  constructor(private route: ActivatedRoute, private service: ApiService, private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
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
    this.service.getAll(`${API.PAYMENTS}payments/payouts?clientId=${clientId}&page=${this.currentPage}&size=7`).subscribe((res)=>{
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
    this.router.navigate(['/view-payouts', id]);
  }

  onpayoutAdded() {
    this.getAll(false);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}


