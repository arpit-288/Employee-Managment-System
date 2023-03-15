import { EdmsService } from 'src/app/edms.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface Element {
  id: number;
  Department: string;
}


const ELEMENT_DATA: Element[] = [

  {id: 1, Department:"Software"},
  {id: 2, Department:"Software"},
  {id: 3, Department:"Software"}

];

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

  constructor(private service:EdmsService) { }

  ngOnInit(): void {
    this.gettingData();
  }

  dataSource = ELEMENT_DATA

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns = ['id','Department']

  gettingData(){
    this.service.gettingDepartment().subscribe((res)=>{
      console.log(res);
      this.dataSource = res.data;
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    },(err)=>{})
  }


}
