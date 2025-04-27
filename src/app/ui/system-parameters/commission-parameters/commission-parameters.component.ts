import { Component } from '@angular/core';

@Component({
  selector: 'app-commission-parameters',
  templateUrl: './commission-parameters.component.html',
  styleUrls: ['./commission-parameters.component.css']
})
export class CommissionParametersComponent {
  filteredProducts: any;
  
  exportToCSV() {
    const headers = ['Title', 'Full Name', 'Gender', 'Nationality', 'Plan', 'Status'];
    const rows = this.filteredProducts.map((product:any) => [
      product.title,
      `${product.name} ${product.surname}`,
      product.gender,
      product.nationality,
      product?.plan?.name || '-',
      product.status
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n'; // Add headers
    rows.forEach((row:any) => {
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
}
