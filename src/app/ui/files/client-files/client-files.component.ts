import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-client-files',
  templateUrl: './client-files.component.html',
  styleUrls: ['./client-files.component.css']
})
export class ClientFilesComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  data:any
  account:any
  accountsId:any;
  fileUploadForm: FormGroup;
  @Input() accountId: any;
  @Output() clientAccountId = new EventEmitter<void>();

  constructor(private service: ApiService, private spinner: NgxSpinnerService,
    private router: Router, private fb: FormBuilder, private route: ActivatedRoute){
      this.fileUploadForm = this.fb.group({
        file: ['']
      });
    }


  ngOnInit(){
  console.log(this.accountId)
  this.clientAccountId.emit();

    this.route.params.subscribe((params : any) => {
      const accountsId = params['id'];
      this.accountsId = accountsId
      if(accountsId){
      this.account = this.getAccount(accountsId);
      this.getAll(accountsId)
    }
    });
 
  }

  getAccount(accountsId: number){
    this.service.getFromUrl(`${API.CLIENTS}clients/${accountsId}`)
    .subscribe((x)=>{
      this.data = x
    })

  }

  getAll(accountsId: number){
    // this.spinner.show();
    this.service.getAll(`${API.CLIENTS}kyc-files?page=${this.currentPage}&size=7&accountId=${this.accountId}`).subscribe((res)=>{
      this.products = res.content
      // console.log(this.products)
      // this.spinner.hide()
      this.totalPages = res.totalPages;
    })
  }

  changePage(newPage: number) {
    if(newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(this.accountsId);
    }
  }

  deletefile(id: string) {
    this.service.delete(`${API.CLIENTS}kyc-files/${id}`).subscribe(() => {
      this.getAll(this.accountsId);
    });
  }
  

  onfileAdded() {
    this.getAll(this.accountsId);
    this.fileUploadForm.reset();
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-policies', id]);
  }

  viewfile(id: string) {
    this.router.navigate(['/view-file', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

  
}
