import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-remittance',
  templateUrl: './remittance.component.html',
  styleUrls: ['./remittance.component.css']
})
export class RemittanceComponent {
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  id:any;
  agents: any;
  selectedTab: string = 'commissions';

  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute,
    private service: ApiService, private router: Router){}


  ngOnInit(){

    this.getAll(false)  
  }

    selectTab(tab: string): void {
      this.selectedTab = tab;
    }

  getAll(reload: boolean){
    this.spinner.show()
    this.service.getAll(`${API.CLIENTS}remittances?page=${this.currentPage}&size=7`).subscribe((res)=>{
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
}
