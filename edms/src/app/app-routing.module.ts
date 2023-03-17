import { AuthGuard } from './services/auth.guard';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employeeDeatils/employee.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:"home",component:HomeComponent, children:[
    {path:"employee-form" , component:EmployeeFormComponent},
    {path:"employee", component:EmployeeComponent},
    {path:"department",component:DepartmentComponent},
  ],canActivate: [AuthGuard]},

  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:'',   redirectTo: 'home', pathMatch: 'full'},
  {path:'**',   redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

 }
