import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from './guards/app.guard'
import { AuthGuard } from './guards/auth.guard' 
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component'

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AppGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
