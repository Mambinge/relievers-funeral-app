import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { UsersComponent } from './ui/users/users.component';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { AddUsersComponent } from './ui/users/add-users/add-users.component';
import { UserProfileComponent } from './ui/users/user-profile/user-profile.component';
import { ResetPasswordComponent } from './ui/auth/reset-password/reset-password.component';
import { UpdateUsersComponent } from './ui/users/update-users/update-users.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { PolicyComponent } from './ui/policy/policy.component';
import { AddPolicyComponent } from './ui/policy/add-policy/add-policy.component';
import { UpdatePolicyComponent } from './ui/policy/update-policy/update-policy.component';
import { ViewPolicyComponent } from './ui/policy/view-policy/view-policy.component';
import { PlansComponent } from './ui/plans/plans.component';
import { AddPlansComponent } from './ui/plans/add-plans/add-plans.component';
import { UpdatePlanComponent } from './ui/plans/update-plan/update-plan.component';
import { PremiumsComponent } from './ui/premiums/premiums.component';
import { UpdatePremiumsComponent } from './ui/premiums/update-premiums/update-premiums.component';
import { AddPremiumsComponent } from './ui/premiums/add-premiums/add-premiums.component';
import { RidersComponent } from './ui/riders/riders.component';
import { AddRidersComponent } from './ui/riders/add-riders/add-riders.component';
import { UpdateRidersComponent } from './ui/riders/update-riders/update-riders.component';
import { SharedModule } from './shared';
import { environment } from 'src/environments/environment';
import { ApiService } from './shared/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import keycloakConfig from 'src/keycloak-config';
import { PaymentSettingsComponent } from './ui/payments/payment-settings/payment-settings.component';
import { PaymentMethodComponent } from './ui/payments/payment-method/payment-method.component';
import { AddPaymentMethodComponent } from './ui/payments/payment-method/add-payment-method/add-payment-method.component';
import { UpdatePaymentMethodComponent } from './ui/payments/payment-method/update-payment-method/update-payment-method.component';
import { AddPaymentSettingsComponent } from './ui/payments/payment-settings/add-payment-settings/add-payment-settings.component';
import { UpdatePaymentSettingsComponent } from './ui/payments/payment-settings/update-payment-settings/update-payment-settings.component';
import { WorkFlowsComponent } from './ui/system-parameters/work-flows/work-flows.component';
import { AddWorkFlowComponent } from './ui/system-parameters/work-flows/add-work-flow/add-work-flow.component';
import { UpdateWorkFlowComponent } from './ui/system-parameters/work-flows/update-work-flow/update-work-flow.component';
import { ViewWorkFlowComponent } from './ui/system-parameters/work-flows/view-work-flow/view-work-flow.component';
import { ViewPlansComponent } from './ui/plans/view-plans/view-plans.component';
import { WorkStagesComponent } from './ui/system-parameters/work-stages/work-stages.component';
import { AddWorkStagesComponent } from './ui/system-parameters/work-stages/add-work-stages/add-work-stages.component';
import { UpdateWorkStagesComponent } from './ui/system-parameters/work-stages/update-work-stages/update-work-stages.component';
import { LoginPageComponent } from './ui/auth/login-page/login-page.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PayoutsComponent } from './ui/payments/payouts/payouts.component';
import { PaymentPremiumsComponent } from './ui/payments/payment-premiums/payment-premiums.component';
import { AddPayoutsComponent } from './ui/payments/payouts/add-payouts/add-payouts.component';
import { ToastrModule } from 'ngx-toastr';
import { AccountsComponent } from './ui/accounts/accounts.component';
import { AddAccountsComponent } from './ui/accounts/add-accounts/add-accounts.component';
import { UpdateAccountsComponent } from './ui/accounts/update-accounts/update-accounts.component';
import { ViewAccountsComponent } from './ui/accounts/view-accounts/view-accounts.component';
import { DependentsComponent } from './ui/dependents/dependents.component';
import { AddContactDetailsComponent } from './ui/accounts/add-contact-details/add-contact-details.component';
import { AddBankDetailsComponent } from './ui/accounts/add-bank-details/add-bank-details.component';
import { AddPersonalDetailsComponent } from './ui/accounts/add-personal-details/add-personal-details.component';
import { AddDependentsComponent } from './ui/dependents/add-dependents/add-dependents.component';
import { UpdateDependentsComponent } from './ui/dependents/update-dependents/update-dependents.component';
import { AddPaymentPremiumsComponent } from './ui/payments/payment-premiums/add-payment-premiums/add-payment-premiums.component';
import { FilesComponent } from './ui/files/files.component';
import { AddFilesComponent } from './ui/files/add-files/add-files.component';
import { UpdateFilesComponent } from './ui/files/update-files/update-files.component';
import { ArrearsComponent } from './ui/payments/arrears/arrears.component';
import { AddArrearsComponent } from './ui/payments/arrears/add-arrears/add-arrears.component';
import { AccountPremiumsComponent } from './ui/account-payments/account-premiums/account-premiums.component';
import { AccountPayoutsComponent } from './ui/account-payments/account-payouts/account-payouts.component';
import { AddAccountPayoutsComponent } from './ui/account-payments/account-payouts/add-account-payouts/add-account-payouts.component';
import { AddAccountPremiumsComponent } from './ui/account-payments/account-premiums/add-account-premiums/add-account-premiums.component';
import { AccountApprovalComponent } from './ui/account-approval/account-approval.component';
import { AddAccountApprovalComponent } from './ui/account-approval/add-account-approval/add-account-approval.component';
import { ViewAccountApprovalComponent } from './ui/account-approval/view-account-approval/view-account-approval.component';
import { PlannerComponent } from './ui/system-parameters/planner/planner.component';
import { ViewPlannerComponent } from './ui/system-parameters/planner/view-planner/view-planner.component';
import { PlanPremiumsComponent } from './ui/system-parameters/planner/plan-premiums/plan-premiums.component';
import { AddPlanPremiumsComponent } from './ui/system-parameters/planner/plan-premiums/add-plan-premiums/add-plan-premiums.component';
import { UpdatePlanPremiumsComponent } from './ui/system-parameters/planner/plan-premiums/update-plan-premiums/update-plan-premiums.component';
import { ViewArrearsComponent } from './ui/payments/arrears/view-arrears/view-arrears.component';
import { DeathTypeComponent } from './ui/system-parameters/death-type/death-type.component';
import { AddDeathTypeComponent } from './ui/system-parameters/death-type/add-death-type/add-death-type.component';
import { UpdateDeathTypeComponent } from './ui/system-parameters/death-type/update-death-type/update-death-type.component';
import { DeathPeriodComponent } from './ui/system-parameters/death-period/death-period.component';
import { AddDeathPeriodComponent } from './ui/system-parameters/death-period/add-death-period/add-death-period.component';
import { UpdateDeathPeriodComponent } from './ui/system-parameters/death-period/update-death-period/update-death-period.component';
import { ClaimsComponent } from './ui/claims/claims.component';
import { AddClaimsComponent } from './ui/claims/add-claims/add-claims.component';
import { UpdateClaimsComponent } from './ui/claims/update-claims/update-claims.component';
import { ClaimsParametersComponent } from './ui/system-parameters/claims-parameters/claims-parameters.component';
import { PaymentsParametersComponent } from './ui/system-parameters/payments-parameters/payments-parameters.component';
import { ClaimApprovalComponent } from './ui/claim-approval/claim-approval.component';
import { AddClaimApprovalComponent } from './ui/claim-approval/add-claim-approval/add-claim-approval.component';
import { ViewClaimsComponent } from './ui/claims/view-claims/view-claims.component';
import { ClientFilesComponent } from './ui/files/client-files/client-files.component';
import { AddClientFilesComponent } from './ui/files/client-files/add-client-files/add-client-files.component';
import { PermissionsComponent } from './ui/auth/permissions/permissions.component';
import { AddPermissionsComponent } from './ui/auth/permissions/add-permissions/add-permissions.component';
import { UpdatePermissionsComponent } from './ui/auth/permissions/update-permissions/update-permissions.component';
import { RolesComponent } from './ui/auth/roles/roles.component';
import { AddRolesComponent } from './ui/auth/roles/add-roles/add-roles.component';
import { UpdateRolesComponent } from './ui/auth/roles/update-roles/update-roles.component';
import { PassowrdPolicyComponent } from './ui/auth/passowrd-policy/passowrd-policy.component';
import { AddPasswordPolicyComponent } from './ui/auth/passowrd-policy/add-password-policy/add-password-policy.component';
import { UpdatePasswordPolicyComponent } from './ui/auth/passowrd-policy/update-password-policy/update-password-policy.component';
import { UserAccountsComponent } from './ui/user-accounts/user-accounts.component';
import { AddUserAccountComponent } from './ui/user-accounts/add-user-account/add-user-account.component';
import { UpdateUserAccountComponent } from './ui/user-accounts/update-user-account/update-user-account.component';
import { ForgotPasswordComponent } from './ui/auth/forgot-password/forgot-password.component';
import { AgentComponent } from './ui/agent/agent.component';
import { AddAgentComponent } from './ui/agent/add-agent/add-agent.component';
import { UpdateAgentComponent } from './ui/agent/update-agent/update-agent.component';
import { CommissionSettingsComponent } from './ui/system-parameters/commission-settings/commission-settings.component';
import { AddCommissionSettingsComponent } from './ui/system-parameters/commission-settings/add-commission-settings/add-commission-settings.component';
import { UpdateCommissionSettingsComponent } from './ui/system-parameters/commission-settings/update-commission-settings/update-commission-settings.component';
import { CommissionsComponent } from './ui/commissions/commissions.component';
import { PayoutsCommissionsComponent } from './ui/commissions/payouts-commissions/payouts-commissions.component';
import { PayCommissionComponent } from './ui/commissions/payouts-commissions/pay-commission/pay-commission.component';
import { CommissionParametersComponent } from './ui/system-parameters/commission-parameters/commission-parameters.component';
import { SecurityParametersComponent } from './ui/system-parameters/security-parameters/security-parameters.component';
import { RemittanceComponent } from './ui/remittance/remittance.component';
import { RemittancePayoutComponent } from './ui/remittance/remittance-payout/remittance-payout.component';
import { PayRemittanceComponent } from './ui/remittance/remittance-payout/pay-remittance/pay-remittance.component';
import { PaymentsPremiumReportComponent } from './ui/reports/payments-premium-report.component';
import { PayoutsReportComponent } from './ui/reports/payouts-report/payouts-report.component';
import { ClientReportComponent } from './ui/reports/client-report/client-report.component';
import { ClaimsReportComponent } from './ui/reports/claims-report/claims-report.component';

// function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
//   return () => {
//     return keycloak.init({
//       config: {
//         url: 'http://192.168.10.44:9001',
//         realm: 'funeral-services',
//         clientId: 'funeral-service-admin',
//       },
//       initOptions: {
//         onLoad: 'login-required',
//         checkLoginIframe: false,
//       },
//       enableBearerInterceptor: true,
//     });
// }}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    UsersComponent,
    AddUsersComponent,
    UserProfileComponent,
    ResetPasswordComponent,
    UpdateUsersComponent,
    PolicyComponent,
    AddPolicyComponent,
    UpdatePolicyComponent,
    ViewPolicyComponent,
    PlansComponent,
    AddPlansComponent,
    UpdatePlanComponent,
    PremiumsComponent,
    UpdatePremiumsComponent,
    AddAccountPayoutsComponent,
    AddPremiumsComponent,
    RidersComponent,
    AddRidersComponent,
    UpdateRidersComponent,
    PaymentSettingsComponent,
    PaymentMethodComponent,
    AddPaymentMethodComponent,
    UpdatePaymentMethodComponent,
    AddPaymentSettingsComponent,
    UpdatePaymentSettingsComponent,
    WorkFlowsComponent,
    AddWorkFlowComponent,
    UpdateWorkFlowComponent,
    ViewWorkFlowComponent,
    ViewPlansComponent,
    WorkStagesComponent,
    AddWorkStagesComponent,
    UpdateWorkStagesComponent,
    LoginPageComponent,
    DashboardComponent,
    PayoutsComponent,
    PaymentPremiumsComponent,
    AddPayoutsComponent,
    AccountsComponent,
    AddAccountsComponent,
    UpdateAccountsComponent,
    ViewAccountsComponent,
    DependentsComponent,
    AddContactDetailsComponent,
    AddBankDetailsComponent,
    AddPersonalDetailsComponent,
    AddDependentsComponent,
    UpdateDependentsComponent,
    AddPaymentPremiumsComponent,
    FilesComponent,
    AddFilesComponent,
    UpdateFilesComponent,
    ArrearsComponent,
    AddArrearsComponent,
    AccountPremiumsComponent,
    AccountPayoutsComponent,
    AddAccountPremiumsComponent,
    AccountApprovalComponent,
    AddAccountApprovalComponent,
    ViewAccountApprovalComponent,
    PlannerComponent,
    ViewPlannerComponent,
    PlanPremiumsComponent,
    AddPlanPremiumsComponent,
    UpdatePlanPremiumsComponent,
    ViewArrearsComponent,
    DeathTypeComponent,
    AddDeathTypeComponent,
    UpdateDeathTypeComponent,
    DeathPeriodComponent,
    AddDeathPeriodComponent,
    UpdateDeathPeriodComponent,
    ClaimsComponent,
    AddClaimsComponent,
    UpdateClaimsComponent,
    ClaimsParametersComponent,
    PaymentsParametersComponent,
    ClaimApprovalComponent,
    AddClaimApprovalComponent,
    ViewClaimsComponent,
    ClientFilesComponent,
    AddClientFilesComponent,
    PermissionsComponent,
    AddPermissionsComponent,
    UpdatePermissionsComponent,
    RolesComponent,
    AddRolesComponent,
    UpdateRolesComponent,
    PassowrdPolicyComponent,
    AddPasswordPolicyComponent,
    UpdatePasswordPolicyComponent,
    UserAccountsComponent,
    AddUserAccountComponent,
    UpdateUserAccountComponent,
    ForgotPasswordComponent,
    AgentComponent,
    AddAgentComponent,
    UpdateAgentComponent,
    CommissionSettingsComponent,
    AddCommissionSettingsComponent,
    UpdateCommissionSettingsComponent,
    CommissionsComponent,
    PayoutsCommissionsComponent,
    PayCommissionComponent,
    CommissionParametersComponent,
    SecurityParametersComponent,
    RemittanceComponent,
    RemittancePayoutComponent,
    PayRemittanceComponent,
    PaymentsPremiumReportComponent,
    PayoutsReportComponent,
    ClientReportComponent,
    ClaimsReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    KeycloakAngularModule,
    SharedModule.forRoot({
      environment: environment.baseUrl,
      production: environment.production,
    }),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressAnimation: 'increasing',
      closeButton: true,
    }),
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-multiple' }),
  ],
  providers: [
    HttpClient,
    ApiService,
    KeycloakService,

    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private readonly keycloak: KeycloakService) {
    // this.keycloak.init({ config: keycloakConfig, initOptions: { onLoad: 'login-required' } });
  }
}
