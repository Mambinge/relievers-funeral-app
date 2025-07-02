import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PlansService, Plan } from 'src/app/services/plans.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  products: Plan[] = [];
  policyId: string = '';
  selectedPlan: Plan | null = null;
  isEditModalOpen = false;

  constructor(
    private plansService: PlansService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.policyId = params['id'];
      this.loadPlans();
    });
  }

  loadPlans() {
    this.spinner.show();
    this.plansService.getPlansForPolicy(this.policyId).subscribe(
      (res) => {
        this.products = res;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        this.toastr.error('Failed to load plans');
      }
    );
  }

  deletePlan(id: string) {
    this.spinner.show();
    this.plansService.deletePlan(id).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Plan deleted successfully');
        this.loadPlans();
      },
      () => {
        this.spinner.hide();
        this.toastr.error('Failed to delete plan');
      }
    );
  }

  openEditModal(plan: Plan) {
    this.selectedPlan = { ...plan };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedPlan = null;
  }

  onPlanAdded() {
    this.loadPlans();
    this.closeEditModal();
  }
}