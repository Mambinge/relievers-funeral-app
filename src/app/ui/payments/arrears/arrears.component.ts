import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-arrears',
  templateUrl: './arrears.component.html',
  styleUrls: ['./arrears.component.css']
})
export class ArrearsComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  arrears!: any[]

  constructor(private service: ApiService, private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
    this.getAll(false)
  }

  getAll(reload: boolean, _$event?: Event){
    // this.spinner.show();
    this.service.getAll(`${API.PAYMENTS}arrears/premiums?page=${this.currentPage}&size=8`).subscribe((res)=>{
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

  deleteArrears(id: string) {
    this.service.delete(`${API.PAYMENTS}arrears/${id}`).subscribe((res) => {
      this.getAll(false)
    });
  }

  viewArrears(id: string) {
    this.router.navigate(['/view-arrearss', id]);
  }

  onarrearsAdded() {
    this.getAll(false);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}


