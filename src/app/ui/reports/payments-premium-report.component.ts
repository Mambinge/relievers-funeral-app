import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../shared/services/api.data';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-payments-premium-report',
  templateUrl: './payments-premium-report.component.html',
  styleUrls: ['./payments-premium-report.component.css'],
})
export class PaymentsPremiumReportComponent implements OnInit {
  reportData: any[] = [];
  form: FormGroup;
  policyNumbers: any[] = [];
  isLoading = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private service: ApiService
  ) {
    this.form = this.fb.group({
      from: [''],
      to: [''],
      policyNumber: [''],
      idNumber: [''],
    });
  }

  ngOnInit(): void {
    this.fetchPolicyNumbers();
  }

  fetchPolicyNumbers(): void {
    this.service.getAll(`${API.CLAIMS}claims`).subscribe(
      (data) => {
        this.policyNumbers = data.content.map((claim: any) => claim);
      },
      (error) => {
        console.error('Error fetching policy numbers', error);
      }
    );
  }

  fetchReportData(): void {
    this.isLoading = true;
    // Commenting out the actual data fetching logic
    // const { from, to, policyNumber, idNumber } = this.form.value;
    // const url = `${API.REPORTS}payments/premium?from=${from}&to=${to}&policyNumber=${policyNumber ? policyNumber : null}&idNumber=${idNumber ? idNumber : null}`;
    
    // this.http.get<any[]>(url).subscribe(
    //   (data) => {
    //     this.reportData = data;
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     console.error('Error fetching report data', error);
    //     this.isLoading = false;
    //   }
    // );

    // Using dummy data for the report
    this.reportData = [
      { name: 'John', surname: 'Doe', policyNumber: '12345', idNumber: 'A123', paymentDate: '2023-01-01', amount: 100.00, notes: 'First payment' },
      { name: 'Jane', surname: 'Smith', policyNumber: '67890', idNumber: 'B456', paymentDate: '2023-02-01', amount: 200.00, notes: 'Second payment' },
      { name: 'Alice', surname: 'Johnson', policyNumber: '54321', idNumber: 'C789', paymentDate: '2023-03-01', amount: 150.00, notes: 'Third payment' },
    ];
    this.isLoading = false;
  }

  generatePDF(): void {
    if (this.reportData.length === 0) {
      alert('No data available to generate PDF');
      return;
    }
  
    const doc = new jsPDF();
    
    const logoUrl = 'assets/relievers-logo.png'; 
    const logoWidth = 40;
    const logoHeight = 20;
    
    doc.setFillColor(63, 81, 181);
    doc.rect(14, 10, logoWidth, logoHeight, 'F');
    doc.setTextColor(255);
    doc.setFontSize(10);
    doc.text(logoUrl, 14 + logoWidth/2, 10 + logoHeight/2, { align: 'center' });
    
    doc.setTextColor(40);
    doc.setFontSize(16);
    doc.text('PAYMENTS PREMIUM REPORT', 105, 20, { align: 'center' });
    
    // Add report metadata
    doc.setFontSize(10);
    doc.setTextColor(100);
    
    const { from, to, policyNumber, idNumber } = this.form.value;
    let filters = 'Filters: ';
    if (from) filters += `From: ${new Date(from).toLocaleDateString()} `;
    if (to) filters += `To: ${new Date(to).toLocaleDateString()} `;
    if (policyNumber) filters += `Policy: ${policyNumber} `;
    if (idNumber) filters += `ID: ${idNumber} `;
    
    doc.text(filters, 14, 35);
    
    // Add generated date
    const generatedDate = new Date().toLocaleString();
    doc.text(`Generated on: ${generatedDate}`, 14, 40);
    
    // Add client information if available
    if (this.reportData.length > 0) {
      const firstRecord = this.reportData[0];
      doc.text(`Client: ${firstRecord.name} ${firstRecord.surname}`, 14, 45);
      doc.text(`Policy Number: ${firstRecord.policyNumber}`, 14, 50);
    }
    
    // Add summary information
    if (this.reportData.length > 0) {
      const totalAmount = this.reportData.reduce((sum, item) => sum + (item.amount || 0), 0);
      doc.setFontSize(11);
      doc.setTextColor(40);
      doc.text(`Total Payments: $ ${totalAmount.toFixed(2)}`, 160, 45, { align: 'right' });
      doc.text(`Number of Payments: ${this.reportData.length}`, 160, 50, { align: 'right' });
    }
    
    // Add table
    autoTable(doc, {
      startY: 55,
      head: [
        [
          'Name',
          'Policy Number',
          'ID Number',
          'Payment Date',
          'Amount',
          'Notes'
        ]
      ],
      body: this.reportData.map(item => [

        (item.name && item.surname) ? `${item.name} ${item.surname}` : '-',
        item.policyNumber || '-',
        item.idNumber || '-',
        item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : '-',
        item.amount ? '$ ' + item.amount.toFixed(2) : '-',
        item.notes || '-',
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [63, 81, 181], // indigo color
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' }, // Payment Date
        1: { cellWidth: 20, halign: 'right' },  // Amount
        2: { cellWidth: 40 },                   // Notes
        3: { cellWidth: 30 },                   // Name
        4: { cellWidth: 25, halign: 'center' }, // Policy Number
        5: { cellWidth: 30, halign: 'center' }  // ID Number
      },
      margin: { top: 55 },
      styles: {
        overflow: 'linebreak',
        cellPadding: 3
      }
    });
    
    // Add footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        105,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
      // Add company info in footer
      doc.text('© 2025 Your Company Name. All rights reserved.', 
        14, doc.internal.pageSize.height - 10);
      doc.text('Confidential', 
        180, doc.internal.pageSize.height - 10, { align: 'right' });
    }
    
    doc.save(`Payments_Premium_Report_${new Date().toISOString().slice(0,10)}.pdf`);
  }
  exportToExcel(): void {
    if (this.reportData.length === 0) {
      alert('No data available to export');
      return;
    }

    // Prepare data for Excel
    const excelData = this.reportData.map(item => ({
      'Name': (item.name && item.surname) ? `${item.name} ${item.surname}` : '',
      'Policy Number': item.policyNumber || '',
      'ID Number': item.idNumber || '',
      'Payment Date': item.paymentDate || '',
      'Amount': item.amount ? '$ ' + item.amount.toFixed(2) : '',
      'Notes': item.notes || '',

    }));

    // Create worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    
    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payments Report');
    
    // Generate file and download
    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `Payments_Premium_Report_${dateStr}.xlsx`);
  }
}