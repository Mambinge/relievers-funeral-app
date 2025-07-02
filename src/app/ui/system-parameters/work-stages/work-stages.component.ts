import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-work-stages',
  templateUrl: './work-stages.component.html',
  styleUrls: ['./work-stages.component.css']
})
export class WorkStagesComponent {
  products:any
  showListUsers = true;
  currentPage = 0;
  totalPages:any
  selectedUser: any = null;
  searchControl = new FormControl('');
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedStatus: string = '';

  statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'AWAITING_APPROVALS', label: 'Awaiting Approvals' },
    { value: 'ACTIVE', label: 'Active' },
  ];

  constructor(private spinner: NgxSpinnerService,private service: ApiService, private router: Router){}


  ngOnInit(){
    this.getAll()
    this.setupSearch();
  }

  setupSearch() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.filterProducts(value || '');
      });
  }
  filterProducts(searchTerm: string) {
    this.products = this.products.filter((product: any) => {
      const searchString = searchTerm.toLowerCase();
      return (
        product.name?.toLowerCase().includes(searchString) ||
        product.surname?.toLowerCase().includes(searchString) ||
        product.nationality?.toLowerCase().includes(searchString) ||
        product?.plan?.name?.toLowerCase().includes(searchString)
      );
    });
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.products];

    if (this.selectedStatus) {
      filtered = filtered.filter(
        (product) => product.status === this.selectedStatus
      );
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

    this.products = filtered;
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

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll();
    }
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.target.value;
    this.applyFilters();
  }

  exportToCSV() {
    const headers = [
      'Title',
      'Full Name',
      'Gender',
      'Nationality',
      'Plan',
      'Status',
    ];
    const rows = this.products.map((product: any) => [
      product.title,
      `${product.name} ${product.surname}`,
      product.gender,
      product.nationality,
      product?.plan?.name || '-',
      product.status,
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n'; // Add headers
    rows.forEach((row: any) => {
      csvContent += row.join(',') + '\n'; // Add rows
    });

    // Create a downloadable link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'clients.csv');
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link);
  }

  getAll(){
    this.spinner.show()
    this.service.getAll(`${API.SERVICE}workflow-stages?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.products = res.content
      this.spinner.hide()
      this.totalPages = res.totalPages;
    })
  }


  deleteworkFlow(id: string) {
    this.service.delete(`${API.SERVICE}workflow-stages/${id}`).subscribe(() => {
      this.getAll();
    });
  }
  
  updatePlan(id: string) {
    this.router.navigate(['/update-work-stage', id]);
  }
  onworkFlowAdded() {
    this.getAll();
  }

  viewworkFlow(id: string) {
    this.router.navigate(['/view-workFlow', id]);
  }

  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
