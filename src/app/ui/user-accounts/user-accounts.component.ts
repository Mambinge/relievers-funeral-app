import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as XLSX from 'xlsx';
import { UserAccountsService, User } from 'src/app/services/user-accounts.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {

  products: User[] = [];
  searchControl = new FormControl();
  currentPage = 0;
  totalPages = 0;
  sortField = 'username';
  sortOrder = 'asc';
  statusFilter: 'ACTIVE' | 'INACTIVE' | null = null;
  selectedUser: any;
  isEditModalOpen = false;

  statusOptions = [
    { label: 'All Statuses', value: '' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' }
  ];

  constructor(
    private userAccountsService: UserAccountsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        this.currentPage = 0; // Reset to first page on search
        return of(value); // Not making an API call here, just passing the value
      })
    ).subscribe(() => this.loadUsers());
  }

  loadUsers(): void {
    this.spinner.show();
    this.userAccountsService.getUsers(
      this.currentPage,
      5, // Page size
      this.sortField,
      this.sortOrder,
      this.searchControl.value,
      this.statusFilter
    ).subscribe(
      response => {
        this.products = response.content.map((user: any) => ({
          id: user.id,
          username: user.username,
          phoneNumber: user.phoneNumber,
          department: user.department ? user.department.name : 'N/A', // Handle null department
          otpEnabled: user.otpEnabled ? 'true' : 'false',
          status: user.accountStatus
        }));
        this.totalPages = response.totalPages;
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Failed to load users');
        this.spinner.hide();
      }
    );
  }

  deleteUsers(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.spinner.show();
      this.userAccountsService.deleteUser(userId).subscribe(
        () => {
          this.toastr.success('User deleted successfully');
          this.loadUsers(); // Refresh the list
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Failed to delete user');
          this.spinner.hide();
        }
      );
    }
  }

  onPlanAdded() {
    this.loadUsers(); // Refresh the list when a plan is added
    this.closeEditModal();
  }

  // Sorting logic
  sort(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    // Implement sorting for dummy data if needed, for now it reloads (which does nothing)
    this.loadUsers();
  }

  // Pagination logic
  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }

  // Status filter logic
  onStatusChange(event: any): void {
    const value = event.target.value;
    this.statusFilter = value ? value : null;
    this.currentPage = 0; // Reset to first page
    this.loadUsers(); // Implement filtering for dummy data if needed
  }

  // Method to open the edit modal
  openEditModal(user: any): void {
    this.selectedUser = { ...user };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedUser = null;
  }

  // Export to CSV
  exportToCSV(): void {
    const dataToExport = this.products.map(product => ({
      Username: product.username,
      'Phone Number': product.phoneNumber,
      Department: product.department,
      'OTP Enabled': product.otpEnabled,
      Status: product.status
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'Users.csv');
  }

}
