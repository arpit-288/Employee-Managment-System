import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private employeeform:EmployeeFormComponent) { }




  setMessage(){

  }

}
