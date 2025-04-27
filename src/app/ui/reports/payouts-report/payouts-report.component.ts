import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import jsPDF from 'jspdf';
import { API, ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-payouts-report',
  templateUrl: './payouts-report.component.html',
  styleUrls: ['./payouts-report.component.css']
})
export class PayoutsReportComponent implements OnInit {
  reportData: any[] = [];
  form: FormGroup;
  claims: any[] = [];

  constructor(private service: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      from: [''],
      to: [''],
      claimId: [''],
    });
  }

  ngOnInit(): void {
    this.fetchClaims();
  }
  // this.service.getAll(`${API.SERVICE}policies?page=${this.currentPage}&size=7`).subscribe((res)=>{

  fetchClaims(): void {
    this.service.getAll(`${API.CLAIMS}claims`).subscribe(
      (data) => {
        this.claims = data;
      },
      (error) => {
        console.error('Error fetching policy numbers', error);
      }
    );
  }

  fetchReportData(): void {
    const { from, to, policyNumber } = this.form.value;
    const url = `${API.REPORTS}payments/premium?from=${from}&to=${to}&policyNumber=${policyNumber}`;
    // this.service.get<any[]>(url).subscribe(
    //   (data) => {
    //     this.reportData = data;
    //     this.generatePDF();
    //   },
    //   (error) => {
    //     console.error('Error fetching report data', error);
    //   }
    // );
  }

  generatePDF(): void {
    const doc = new jsPDF();
    doc.text('Payments Premium Report', 14, 16);
    (doc as any).autoTable({
      head: [['Column 1', 'Column 2', 'Column 3']],
      body: this.reportData.map((item) => [item.col1, item.col2, item.col3]),
    });
    doc.save('payments-premium-report.pdf');
  }
}
