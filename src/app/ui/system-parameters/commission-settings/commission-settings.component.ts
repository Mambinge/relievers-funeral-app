import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-commission-settings',
  templateUrl: './commission-settings.component.html',
  styleUrls: ['./commission-settings.component.css']
})
export class CommissionSettingsComponent {
  settings:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any;
  
  constructor(private spinner: NgxSpinnerService,private service: ApiService, private router: Router){}


  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`${API.CLIENTS}commission-settings?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.settings = res.content
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

  deleteSettings(id: string) {
    this.service.delete(`${API.CLIENTS}commission-settings/${id}`).subscribe(() => {
      this.getAll();
    });
  }

  onsettingsAdded(){

  }

  viewSettings(id: string) {
    this.router.navigate(['/view-commission-settings', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
