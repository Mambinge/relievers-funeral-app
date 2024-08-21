import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent {
  claims:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  // claimsId!: number;
  id:any;
  // products:any

  constructor(private spinner: NgxSpinnerService,private route: ActivatedRoute,
    private service: ApiService, private router: Router){}


  ngOnInit(){
    this.route.params.subscribe((params : any) => {
      const claimId = params['id'];
      this.claims = +claimId

    });

    this.getAll(false)  }

  getAll(reload: boolean){
    this.spinner.show()
    this.service.getAll(`${API.CLAIMS}claims?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.claims = res.content
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

  deleteClaims(id: string) {
    this.service.delete(`${API.CLAIMS}claims/${id}`).subscribe(() => {
      this.getAll(false);
    });
  }
  

  onclaimsAdded() {
    this.getAll(false);
  }

  updateClaims(id: string) {
    this.router.navigate(['/update-claims', id]);
  }

  viewClaims(id: string) {
    this.router.navigate(['/view-claims', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
