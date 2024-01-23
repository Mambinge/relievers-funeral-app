import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';
import { UsersComponent } from './ui/users/users.component';
import { AddUsersComponent } from './ui/users/add-users/add-users.component';
import { UserProfileComponent } from './ui/users/user-profile/user-profile.component';
import { AuthGuard } from './shared/guard/auth-guard';
import { PolicyComponent } from './ui/policy/policy.component';
import { ViewPolicyComponent } from './ui/policy/view-policy/view-policy.component';
import { PlansComponent } from './ui/plans/plans.component';
import { PremiumsComponent } from './ui/premiums/premiums.component';
import { RidersComponent } from './ui/riders/riders.component';
import { PaymentMethodComponent } from './ui/payments/payment-method/payment-method.component';
import { PaymentSettingsComponent } from './ui/payments/payment-settings/payment-settings.component';
import { WorkFlowsComponent } from './ui/system-parameters/work-flows/work-flows.component';
import { ViewWorkFlowComponent } from './ui/system-parameters/work-flows/view-work-flow/view-work-flow.component';
import { ViewPlansComponent } from './ui/plans/view-plans/view-plans.component';
import { WorkStagesComponent } from './ui/system-parameters/work-stages/work-stages.component';
import { LoginPageComponent } from './ui/auth/login-page/login-page.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { PayoutsComponent } from './ui/payments/payouts/payouts.component';
import { UpdatePlanComponent } from './ui/plans/update-plan/update-plan.component';
import { UpdateRidersComponent } from './ui/riders/update-riders/update-riders.component';
import { UpdatePremiumsComponent } from './ui/premiums/update-premiums/update-premiums.component';
import { UpdateWorkFlowComponent } from './ui/system-parameters/work-flows/update-work-flow/update-work-flow.component';
import { UpdatePaymentMethodComponent } from './ui/payments/payment-method/update-payment-method/update-payment-method.component';
import { UpdatePolicyComponent } from './ui/policy/update-policy/update-policy.component';
import { UpdateWorkStagesComponent } from './ui/system-parameters/work-stages/update-work-stages/update-work-stages.component';
import { UpdatePaymentSettingsComponent } from './ui/payments/payment-settings/update-payment-settings/update-payment-settings.component';
import { AccountsComponent } from './ui/accounts/accounts.component';
import { ViewAccountsComponent } from './ui/accounts/view-accounts/view-accounts.component';
import { AddAccountsComponent } from './ui/accounts/add-accounts/add-accounts.component';
import { PaymentPremiumsComponent } from './ui/payments/payment-premiums/payment-premiums.component';
import { DependentsComponent } from './ui/dependents/dependents.component';
import { UpdateAccountsComponent } from './ui/accounts/update-accounts/update-accounts.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent},

  {
    path: '',
    component: LayoutComponent,
    canActivate: [],
    children: [
      { path: 'accounts', component: AccountsComponent},
      { path: 'view-accounts/:id', component: ViewAccountsComponent},
      { path: 'open-account', component: AddAccountsComponent},
      { path: 'update-accounts/:id', component: UpdateAccountsComponent},

      { path: 'users', component: UsersComponent},
      { path: 'user-profile', component: UserProfileComponent},

      { path: 'policies', component: PolicyComponent},
      { path: 'view-policy', component: ViewPolicyComponent},
      { path: 'view-policy/:id', component: ViewPolicyComponent},
      { path: 'update-policies/:id', component: UpdatePolicyComponent},

      { path: 'plans', component: PlansComponent},
      { path: 'view-plans/:id', component: ViewPlansComponent},
      { path: 'update-plans/:id', component: UpdatePlanComponent},

      { path: 'premiums', component: PremiumsComponent},
      { path: 'update-premiums/:id', component: UpdatePremiumsComponent},

      { path: 'riders', component: RidersComponent},
      { path: 'update-riders/:id', component: UpdateRidersComponent},

      { path: 'payment-method', component: PaymentMethodComponent},
      { path: 'update-payment-method/:id', component: UpdatePaymentMethodComponent},

      { path: 'payment-settings', component: PaymentSettingsComponent},
      { path: 'update-payment-settings/:id', component: UpdatePaymentSettingsComponent},

      { path: 'work-flows', component: WorkFlowsComponent},
      { path: 'update-work-flow/:id', component: UpdateWorkFlowComponent},
      { path: 'view-work-flows/:id', component: ViewWorkFlowComponent},
      
      { path: 'work-flows-stage', component: WorkStagesComponent},
      { path: 'update-work-stage/:id', component: UpdateWorkStagesComponent},

      { path: 'payment-payouts', component: PayoutsComponent},

      { path: 'payment-premiums', component: PaymentPremiumsComponent},

      { path: 'dependent', component: DependentsComponent},

      { path: '**', component: DashboardComponent }
    ]
  },

];

;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
