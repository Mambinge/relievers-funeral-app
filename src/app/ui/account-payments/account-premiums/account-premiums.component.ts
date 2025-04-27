import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService, API } from 'src/app/shared/services';

@Component({
  selector: 'app-account-premiums',
  templateUrl: './account-premiums.component.html',
  styleUrls: ['./account-premiums.component.css']
})
export class AccountPremiumsComponent implements OnInit {
  products: any;
  showListUsers = true;
  currentPage = 0;
  totalPages: any;
  payout!: any[];
  clientsId: any;
  id: any;
  @Input() policyNumber: any;
  @Input() clientAccountId: any;
  number: any;

  // Payment method cache
  paymentMethodsCache: Map<number, string> = new Map();

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    console.log(this.policyNumber);
    this.number = this.policyNumber;
    this.route.params.subscribe((params: any) => {
      const clientId = params['id'];
      this.clientsId = +clientId;
      if (clientId) {
        this.id = this.getAll(clientId);
      }
    });
    // this.getAll(false);
  }

  // Fetch all payments for the client
  getAll(clientId: any, _$event?: Event) {
    // this.spinner.show();
    this.service
      .getAll(`${API.PAYMENTS}payments/premiums?clientId=${clientId}&page=${this.currentPage}&size=7`)
      .subscribe((res) => {
        this.products = res.content;
        this.spinner.hide();
        this.totalPages = res.totalPages;

        // Fetch payment methods for each product
        this.products.forEach((product: { paymentMethodId: number; }) => {
          this.fetchPaymentMethod(product.paymentMethodId);
        });
      });
  }

  // Fetch payment method using paymentMethodId
  fetchPaymentMethod(paymentMethodId: number) {
    // Check if payment method is already cached
    if (this.paymentMethodsCache.has(paymentMethodId)) {
      return; // Already cached
    }

    // Make the API call to fetch the payment method
    this.service.getFromUrl(`${API.SERVICE}payment-methods/${paymentMethodId}`).subscribe((res: any) => {
      // Cache the result
      this.paymentMethodsCache.set(paymentMethodId, res.name);
    });
  }

  // Pagination handler
  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getAll(false);
    }
  }

  // Delete payout
  deletepayout(id: string) {
    this.service.delete(`${API.PAYMENTS}payout/${id}`).subscribe((res) => {
      this.getAll(false);
    });
  }

  // View payout details
  viewpayout(id: string) {
    this.router.navigate(['/view-payment-premiums', id]);
  }

  // Reload data when a payout is added
  onpayoutAdded() {
    this.getAll(this.clientsId);
  }

  // Toggle user view
  toggleView() {
    this.showListUsers = !this.showListUsers;
  }
}
