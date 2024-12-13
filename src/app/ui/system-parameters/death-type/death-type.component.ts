import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-death-type',
  templateUrl: './death-type.component.html',
  styleUrls: ['./death-type.component.css']
})
export class DeathTypeComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  
  constructor(private spinner: NgxSpinnerService,private service: ApiService, private router: Router){}


  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`${API.CLAIMS}type?page=${this.currentPage}&size=7`).subscribe((res)=>{
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

  deletedeathType(id: string) {
    this.service.delete(`${API.CLAIMS}type/${id}`).subscribe(() => {
      this.getAll();
    });
  }
  

  ondeathTypeAdded() {
    this.getAll();
  }

  viewdeathType(id: string) {
    this.router.navigate(['/view-death-type', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
