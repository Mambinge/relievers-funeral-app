import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-passowrd-policy',
  templateUrl: './passowrd-policy.component.html',
  styleUrls: ['./passowrd-policy.component.css']
})
export class PassowrdPolicyComponent {
  passwordPolicys:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  id:any;

  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute,
    private service: ApiService, private router: Router){}


  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const passwordPolicyId = params['id'];
      this.passwordPolicys = +passwordPolicyId

    });

    this.getAll(false)  }

  getAll(reload: boolean){
    this.spinner.show()
    this.service.getAll(`${API.AUTH}password-policy?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.passwordPolicys = res.content
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

  deletepasswordPolicys(id: string) {
    this.service.delete(`${API.AUTH}password-policy/delete/${id}`).subscribe(() => {
      this.getAll(false);
    });
  }
  

  onpasswordPolicyAdded() {
    this.getAll(false);
  }

  updatepasswordPolicys(id: string) {
    this.router.navigate(['/update-passwordPolicys', id]);
  }

  viewpasswordPolicys(id: string) {
    this.router.navigate(['/view-passwordPolicys', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
