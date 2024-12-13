import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  roles:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  id:any;

  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute,
    private service: ApiService, private router: Router){}


  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const rolesId = params['id'];
      this.roles = +rolesId

    });

    this.getAll(false)  }

  getAll(reload: boolean){
    this.spinner.show()
    this.service.getAll(`${API.AUTH}roles?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.roles = res.content
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

  deleteroles(id: string) {
    this.service.delete(`${API.AUTH}roles/${id}`).subscribe(() => {
      this.getAll(false);
    });
  }
  

  onrolesAdded() {
    this.getAll(false);
  }

  updateroles(id: string) {
    this.router.navigate(['/update-roles', id]);
  }

  viewroles(id: string) {
    this.router.navigate(['/view-roles', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
