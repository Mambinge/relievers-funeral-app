import { Component, OnInit } from '@angular/core';
import {
  Chart,
  registerables, // Import all required components
} from 'chart.js';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Quick Stats
  newClientsThisMonth = 34;
  activePolicies: any;
  activePercentage = 87;
  pendingClaims = 23;
  avgProcessingDays = 3;
  monthlyRevenue = 158432;
  revenueGrowth = 12;
  currentPage = 0;
  totalPages: number = 0;
  pageSize = 7;
  totalClients: any;

  // Recent Claims
  recentClaims = [
    {
      clientName: 'John Smith',
      policyNumber: '1234',
      amount: 5000,
      status: 'Pending',
    },
    {
      clientName: 'Sarah Johnson',
      policyNumber: '1235',
      amount: 7500,
      status: 'Approved',
    },
    {
      clientName: 'Michael Brown',
      policyNumber: '1236',
      amount: 6000,
      status: 'Pending',
    },
    {
      clientName: 'Emma Wilson',
      policyNumber: '1237',
      amount: 4500,
      status: 'Approved',
    },
  ];

  // Upcoming Remittances

  // Commission Summary
  commissionSummary: any;
  upcomingRemittances: any;

  constructor(private service: ApiService) {
    Chart.register(...registerables); // Register all required components globally
  }

  ngOnInit() {
    this.initPremiumChart();
    this.initArrearsChart();
    this.getTotalClients();
    this.getTotalPolicies();
    this.getRemmittances();
    this.getCommissions();
  }

  getCommissions() {
    this.service.getAll(`${API.CLIENTS}commissions?page=${this.currentPage}&size=7`).subscribe((res)=>{
      this.commissionSummary = res.content.slice(0, 5);
      this.totalPages = res.totalPages;
    })  }

  getRemmittances() {
    this.service
      .getAll(`${API.CLIENTS}remittances?page=${this.currentPage}&size=7`)
      .subscribe((res) => {
        this.upcomingRemittances = res.content.slice(0, 5);
        this.totalPages = res.totalPages;
      });
  }

  getTotalPolicies() {
    this.service
      .getAll(
        `${API.SERVICE}policies?page=${this.currentPage}&size=${this.pageSize}`
      )
      .subscribe({
        next: (res) => {
          this.activePolicies = res.totalElements;
          this.totalPages = res.totalPages;
        },
      });
  }

  getTotalClients() {
    this.service
      .getAll(
        `${API.CLIENTS}clients?page=${this.currentPage}&size=${this.pageSize}`
      )
      .subscribe({
        next: (res) => {
          this.totalClients = res.totalElements;
          this.totalPages = res.totalPages;
        },
      });
  }

  initPremiumChart() {
    const ctx = document.getElementById('premiumChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Premium Collections',
            data: [65000, 72000, 68000, 78000, 82000, 85000],
            borderColor: 'rgb(79, 70, 229)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  initArrearsChart() {
    const ctx = document.getElementById('arrearsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['0-30 Days', '31-60 Days', '60+ Days'],
        datasets: [
          {
            data: [65, 25, 10],
            backgroundColor: [
              'rgb(34, 197, 94)',
              'rgb(234, 179, 8)',
              'rgb(239, 68, 68)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
