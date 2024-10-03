import { Routes } from '@angular/router';
import { AppLoginComponent } from './components/login/app-login.component';
import { AppSignUpComponent } from './components/sign-up/app-signup.component';
import { AppDashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './guards/auth-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: "login", component: AppLoginComponent },
    { path: "sign-up", component: AppSignUpComponent },
    { path: 'dashboard', component: AppDashboardComponent, canActivate: [AuthGuardService] }
];
