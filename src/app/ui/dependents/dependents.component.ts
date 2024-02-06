import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  dependentsId!: number;
  dependents!:any
  id!:any

  constructor(private service: ApiService, private router: Router, 
    private route: ActivatedRoute, private spinner: NgxSpinnerService,){}


  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const dependentsId = params['id'];
      this.dependentsId = +dependentsId
      if(dependentsId){
        this.id = this.getAll(dependentsId)
      }
    });
  }

  getAll(dependentsId: any){
    this.service.getAll(`${API.CLIENTS}dependants?policyHolderId=${dependentsId}&page=${this.currentPage}&size=8`).subscribe((res)=>{
      this.products = res.content
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(this.dependentsId);
        }
  }

  deleteDependent(id: string) {
    this.service.delete(`${API.CLIENTS}dependants/${id}`).subscribe((res) => {
      this.getAll(this.dependentsId);  
      });
  }

  updateDependent(id: string) {
    this.router.navigate(['/update-dependents', id]);
  }

  onDependentAdded() {
    this.getAll(this.dependentsId);
    }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }


}
