import { Component, OnInit } from '@angular/core';
import { clear } from 'console';
import { EdmsService } from 'src/app/edms.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private service: EdmsService) { }

  Name: string = '';
  Designation: string = '';
  Department: string = '';
  Email: string = '';
  Phone: number;
  Date: Date;




  ngOnInit(): void {

  }


  Submit() {
    let obj = { Name: this.Name, Designation: this.Designation, Department: this.Department, Email: this.Email, Phone: this.Phone, Date: this.Date };
    // {Name:string,Designation:string,Department:string,Email:string,Phone:number,Date:Date}
    console.log(obj);

    this.service.postingData(obj).subscribe((responce) => {
      console.log(responce);
      // Object.keys(obj).forEach(keys=> delete obj[keys]);
    }, (error) => { })

  }




}
