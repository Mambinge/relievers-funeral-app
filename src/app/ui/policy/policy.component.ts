import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PolicyService, Policy } from 'src/app/services/policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  policies: Policy[] = [];
  currentPage = 0;
  totalPages = 0;
  sortField = 'name';
  sortOrder = 'asc';
  searchControl = new FormControl();
  selectedPolicy: Policy | null = null;
  isEditModalOpen = false;

  constructor(
    private policyService: PolicyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadPolicies();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        this.currentPage = 0;
        return of(value);
      })
    ).subscribe(() => this.loadPolicies());
  }

  loadPolicies() {
    this.spinner.show();
    this.policyService.getPolicies(this.currentPage, 7, this.sortField, this.sortOrder, this.searchControl.value).subscribe(
      res => {
        this.policies = res.content;
        this.totalPages = res.totalPages;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        this.toastr.error('Failed to load policies');
      }
    );
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadPolicies();
    }
  }

  deletePolicy(id: string) {
    this.spinner.show();
    this.policyService.deletePolicy(id).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Policy deleted successfully');
        this.loadPolicies();
      },
      () => {
        this.spinner.hide();
        this.toastr.error('Failed to delete policy');
      }
    );
  }

  viewPolicy(id: string) {
    this.router.navigate(['/plans', id]);
  }

  openEditModal(policy: Policy) {
    this.selectedPolicy = { ...policy };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedPolicy = null;
  }

  onPolicyUpdated() {
    this.loadPolicies();
    this.closeEditModal();
  }

  onPolicyAdded() {
    this.loadPolicies();
  }
}
