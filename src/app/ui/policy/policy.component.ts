import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API, ApiService } from 'src/app/shared/services';
import { UpdatePolicyComponent } from './update-policy/update-policy.component';
import { InstanceOptions, Modal, ModalOptions } from 'flowbite';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  
  constructor(private service: ApiService, private spinner: NgxSpinnerService,
    private router: Router, private fb: FormBuilder, private route: ActivatedRoute){}


  ngOnInit(){
    this.getAll()
 
  }

  getAll(){
    this.spinner.show();
    this.service.getAll(`${API.SERVICE}policies?page=${this.currentPage}&size=7`).subscribe((res)=>{
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

  deletePolicy(id: string) {
    this.service.delete(`${API.SERVICE}policies/${id}`).subscribe(() => {
      this.getAll();
    });
  }
  

  onPolicyAdded() {
    this.getAll();
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-policies', id]);
  }

  viewPolicy(id: string) {
    this.router.navigate(['/view-policy', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }

  
}
