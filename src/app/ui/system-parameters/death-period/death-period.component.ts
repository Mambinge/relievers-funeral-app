import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-death-period',
  templateUrl: './death-period.component.html',
  styleUrls: ['./death-period.component.css']
})
export class DeathPeriodComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any;
  
  constructor(private spinner: NgxSpinnerService,private service: ApiService, private router: Router){}


  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`${API.CLAIMS}period?page=${this.currentPage}&size=7`).subscribe((res)=>{
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

  deletedeathPeriod(id: string) {
    this.service.delete(`${API.CLAIMS}period/${id}`).subscribe(() => {
      this.getAll();
    });
  }




  ondeathperiodAdded() {
    this.getAll();
  }

  viewdeathperiod(id: string) {
    this.router.navigate(['/view-death-period', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
