import { EmployeeFormComponent } from './../employee-form/employee-form.component';
import { EdmsService } from './../../edms.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { edms } from 'src/app/edms';
import * as moment from 'moment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



export class EmployeeComponent implements OnInit {


  displayedColumns: string[] = [ 'id', 'Name', 'Designation', 'Department', 'Email', 'Phone', 'Date', 'delete', 'update'];
  dataSource = new MatTableDataSource<edms>();
  displayStyle = "none";

  idd:number;
  updateName: string = '';
  updateDepartment: string = '';
  updateDesignation: string = '';
  updateEmail: string = '';
  updatePhone: number;
  updateDate: Date | string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  constructor(private route: Router, private EdmsService: EdmsService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  edmsData = []


  ngAfterViewInit() {


    // this.pagination();
    this.dataSource.paginator = this.paginator;
  }






  getAllData() {

    this.EdmsService.getAllEmployeeDetails().subscribe((edms) => {
      // console.log("coulmns", this.displayedColumns[0]);
      // console.log(edms,"Check EDMS");

      this.dataSource.data = edms;
      console.log(this.dataSource.data);

      for(let i=0;i<this.dataSource.data.length;i++){
        this.dataSource.data[i].sno=i+1;
    }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  deleteEmployee(id: any, i: number) {
    this.EdmsService.deleteEmployee(id).subscribe((res) => {
      if (!res['error']) {
        alert('Employee Deleted');
        let data = this.dataSource.data
        console.log(data);
        data.splice(i, 1);
        console.log(data);
        this.dataSource.data = data
      }
    }, (err) => { })
  }




  update(id: any,i:number) {

    this.displayStyle = "block";
    // console.log(this.dataSource.data[i].Name);

    this.idd = id;
    this.updateName = this.dataSource.data[i].Name;
    this.updateDesignation = this.dataSource.data[i].Designation;
    this.updateDepartment = this.dataSource.data[i].Department;
    this.updateEmail = this.dataSource.data[i].Email;
    this.updatePhone = this.dataSource.data[i].Phone;
    this.updateDate = moment.utc(this.dataSource.data[i].Date).format('YYYY-MM-DD');


  }


  save(){
    let i = this.idd;
    let obj = { Name: this.updateName, Designation: this.updateDesignation, Department: this.updateDepartment, Email: this.updateEmail, Phone: this.updatePhone, Date: this.updateDate };

    // console.log(i);
    this.EdmsService.updateEmployeeDetails(i,obj).subscribe((res) => {
          console.log(res);
        }, (err) => { })

        // let data = this.dataSource.data;
        // data[]
      window.location.reload();

      this.displayStyle = "none";
  }



  // clickedRows = new Set<edms>();

}

// export interface edms {
//   name: string;
//   position: number;
//   id: number;
//   Email: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', id: 1.0079, Email: 'H' },
//   { position: 2, name: 'Helium', id: 4.0026, Email: 'He' },
//   { position: 3, name: 'Lithium', id: 6.941, Email: 'Li' },
//   { position: 4, name: 'Beryllium', id: 9.0122, Email: 'Be' },
//   { position: 5, name: 'Boron', id: 10.811, Email: 'B' },
//   { position: 6, name: 'Carbon', id: 12.0107, Email: 'C' },
//   { position: 7, name: 'Nitrogen', id: 14.0067, Email: 'N' },
//   { position: 8, name: 'Oxygen', id: 15.9994, Email: 'O' },
//   { position: 9, name: 'Fluorine', id: 18.9984, Email: 'F' },
//   { position: 10, name: 'Neon', id: 20.1797, Email: 'Ne' },
//   { position: 11, name: 'Neon', id: 20.1797, Email: 'Ne' }

// ];



