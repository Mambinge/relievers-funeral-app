import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.css']
})
export class PaymentSettingsComponent implements OnInit {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  selectedTab: string = 'deathType';
  searchControl = new FormControl('');
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedStatus: string = '';
  filteredProducts: any[] = [];
  statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'INACTIVE', label: 'InActive' }

  ];

  constructor(private service: ApiService,private spinner: NgxSpinnerService, private router: Router){}


  ngOnInit(){
    this.getAll()
    this.setupSearch(); 
  }

  setupSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filterProducts(value || '');
    });
  }
  filterProducts(searchTerm: string) {
    this.filteredProducts = this.products.filter((agent: { name: string; surname: string; nationality: string; plan: { name: string; }; }) => {
      const searchString = searchTerm.toLowerCase();
      return (
        agent.name?.toLowerCase().includes(searchString) ||
        agent.surname?.toLowerCase().includes(searchString) ||
        agent.nationality?.toLowerCase().includes(searchString) ||
        agent?.plan?.name?.toLowerCase().includes(searchString)
      );
    });
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.filteredProducts];
    
    if (this.selectedStatus) {
      filtered = filtered.filter(product => product.status === this.selectedStatus);
    }

    if (this.sortField) {
      filtered.sort((a, b) => {
        const aValue = this.getNestedValue(a, this.sortField);
        const bValue = this.getNestedValue(b, this.sortField);
        
        if (this.sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    this.filteredProducts = filtered;
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, i) => o?.[i], obj);
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'sort';
    return this.sortDirection === 'asc' ? 'sort-up' : 'sort-down';
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.target.value;
    this.applyFilters();
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`${API.SERVICE}payment-settings?page=${this.currentPage}&size=7`).subscribe((res)=>{
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

  deletepaymentSettings(id: string) {
    this.service.delete(`${API.SERVICE}payment-settings/${id}`).subscribe((res) => {
      this.getAll()
    });
  }

  updatePlan(id: string) {
    this.router.navigate(['/update-payment-settings', id]);
  }

  onpaymentSettingsAdded() {
    this.getAll();
  }

  viewpaymentSettings(id: string) {
    this.router.navigate(['/view-paymentSettings', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}

