import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsReportComponent } from './claims-report/claims-report.component';
import { ClientReportComponent } from './client-report/client-report.component';
import { PayoutsReportComponent } from './payouts-report/payouts-report.component';

const routes: Routes = [
  { path: 'claims-report', component: ClaimsReportComponent },
  { path: 'payouts-report', component: PayoutsReportComponent },
  { path: 'client-report', component: ClientReportComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
