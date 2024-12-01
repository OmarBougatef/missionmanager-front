import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionListComponent } from './components/mission-list/mission-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MissionFormComponent } from './components/mission-form/mission-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component'; // Import the LoginComponent
import { ProfileComponent } from './components/profile/profile.component';
import { LiquidationListComponent } from './components/liquidation-list/liquidation-list.component';
import { LiquidationFormComponent } from './components/liquidation-form/liquidation-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for login page
  { path: 'users/list', component: UserListComponent },
  { path: 'missions/list', component: MissionListComponent },
  { path: 'liquidations/list', component: LiquidationListComponent },
  { path: 'users/add', component: UserFormComponent },
  { path: 'missions/add', component: MissionFormComponent },
  { path: 'liquidations/add', component: LiquidationFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Set login as the default page
  { path: '**', redirectTo: '/login' } // Redirect unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
