import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent {
  permissions:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  id:any;

  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute,
    private service: ApiService, private router: Router){}


  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const permissionId = params['id'];
      this.permissions = +permissionId

    });

    this.getAll(false)  }

  getAll(reload: boolean){
    this.spinner.show()
    this.service.getAll(`${API.AUTH}permission?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.permissions = res.content
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
