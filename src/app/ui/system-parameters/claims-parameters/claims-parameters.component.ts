import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-claims-parameters',
  templateUrl: './claims-parameters.component.html',
  styleUrls: ['./claims-parameters.component.css']
})
export class ClaimsParametersComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  selectedTab: string = 'deathType';

  constructor(private service: ApiService, private router: Router,  private spinner: NgxSpinnerService,){}


  ngOnInit(){
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}


