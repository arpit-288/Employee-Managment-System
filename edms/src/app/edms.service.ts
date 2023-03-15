import { environment } from './../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EmployeeComponent } from './employee/employeeDeatils/employee.component';

import { edms } from './edms';


@Injectable({
  providedIn: 'root'
})
export class EdmsService {

  constructor( private http: HttpClient ) { }

  // http://localhost:3000/

  // Connect Backend to Angular

    apiurl = `http://localhost:3000`

  getAllData():Observable<any>{
      return this.http.get(`${this.apiurl}/employee`);
      // return this.http.get(`${this.apiurl}/employee`).pipe(map((response:any)=> response.data as edms[]));
  }


  getDataByid(id:number):Observable<any>{
      return this.http.get(`${this.apiurl}/employee/${id}`);
  }

  //Insert Data at SignUp Page
  insertData(obj:{name:string,email:string,password:string}):Observable<any>{
      return this.http.post(`${this.apiurl}/signup`,obj);
  }

  // Validate the login authentication details
  validate(obj:{email:string,password:string}):Observable<any>{
    return this.http.post(`${this.apiurl}/login`,obj);
}

  updateData(id:number,obj:{task_name:string}):Observable<any>{
      return this.http.put(`${this.apiurl}/employee/${id}`,obj);
  }
  deleteData(id:number):Observable<any>{
      return this.http.delete(`${this.apiurl}/employee/${id}`);
  }

  // Employee Form Api call
  getAllEmployeeDetails():Observable<edms[]>{
    return this.http.get(`${this.apiurl}/employeedetails`).pipe(map((response:any)=> response.data as edms[]));
}

  postingData(obj:{Name:string,Designation:string,Department:string,Email:string,Phone:number,Date:Date|string}):Observable<edms[]>{
  return this.http.post(`${this.apiurl}/employeedetails`,obj).pipe(map((response:any)=> response.data as edms[]));
}



  deleteEmployee(id:number):Observable<any>{
    return this.http.delete(`${this.apiurl}/employeedetails/${id}`);
}

  // Employee Department
  gettingDepartment():Observable<any>{
    return this.http.get(`${this.apiurl}/employeedepartment`);
  }


}
