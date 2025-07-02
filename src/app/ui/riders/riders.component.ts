import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RidersService, Rider } from 'src/app/services/riders.service';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.css']
})
export class RidersComponent implements OnInit {
  riders: Rider[] = [];
  currentPage = 0;
  totalPages = 0;
  sortField = 'fullName';
  sortOrder = 'asc';
  searchControl = new FormControl();
  selectedRider: Rider | null = null;
  isEditModalOpen = false;

  constructor(
    private ridersService: RidersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadRiders();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        this.currentPage = 0;
        return of(value);
      })
    ).subscribe(() => this.loadRiders());
  }

  loadRiders() {
    this.spinner.show();
    this.ridersService.getRiders(this.currentPage, 7, this.sortField, this.sortOrder, this.searchControl.value).subscribe(
      res => {
        this.riders = res.content;
        this.totalPages = res.totalPages;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        this.toastr.error('Failed to load riders');
      }
    );
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadRiders();
    }
  }

  deleteRider(id: string) {
    this.spinner.show();
    this.ridersService.deleteRider(id).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Rider deleted successfully');
        this.loadRiders();
      },
      () => {
        this.spinner.hide();
        this.toastr.error('Failed to delete rider');
      }
    );
  }

  viewRider(id: string) {
    // Implement navigation if there's a view page for a rider
    // this.router.navigate(['/view-rider', id]);
  }

  openEditModal(rider: Rider) {
    this.selectedRider = { ...rider };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedRider = null;
  }

  onRiderUpdated(): void {
    this.loadRiders();
    this.closeEditModal();
  }

  onRiderAdded(): void {
    this.loadRiders();
  }
}
