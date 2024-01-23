import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, ApiService } from 'src/app/shared/services';
import { Dependent } from './model/dependent';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.css']
})
export class DependentsComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  dependent!: Dependent[]

  constructor(private service: ApiService, private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
    this.getAll(false)
  }

  getAll(reload: boolean, _$event?: Event){
    // this.spinner.show();
    this.service.getAll(`${API.CLIENTS}dependants?page=${this.currentPage}&size=8`).subscribe((res)=>{
      this.products = res.content
      // this.spinner.hide();
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(false);
    }
  }

  deleteDependent(id: string) {
    this.service.delete(`depandentS/${id}`).subscribe((res) => {
      this.getAll(false)
    });
  }

  viewDependent(id: string) {
    this.router.navigate(['/view-dependents', id]);
  }

  updateDependent(id: string) {
    this.router.navigate(['/update-dependents', id]);
  }

  onDependentAdded() {
    this.getAll(false);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
