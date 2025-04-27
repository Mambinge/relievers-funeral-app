import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../shared/services/api.data';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payments-premium-report',
  templateUrl: './payments-premium-report.component.html',
  styleUrls: ['./payments-premium-report.component.css'],
})
export class PaymentsPremiumReportComponent implements OnInit {
  reportData: any[] = [];
  form: FormGroup;
  policyNumbers: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      from: [''],
      to: [''],
      policyNumber: [''],
      IdNumber: ['']
    });
  }

  ngOnInit(): void {
    this.fetchPolicyNumbers();
  }

  fetchPolicyNumbers(): void {
    this.http.get<any[]>(`${API.SERVICE}policies`).subscribe(
      (data) => {
        this.policyNumbers = data.map((policy) => policy.policyNumber);
      },
      (error) => {
        console.error('Error fetching policy numbers', error);
      }
    );
  }

  fetchReportData(): void {
    const { from, to, policyNumber, idNumber } = this.form.value;
    const url = `${API.REPORTS}payments/premium?from=${from}&to=${to}&policyNumber=${policyNumber}&idNumber=${idNumber}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.reportData = data;
        this.generatePDF();
      },
      (error) => {
        console.error('Error fetching report data', error);
      }
    );
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
