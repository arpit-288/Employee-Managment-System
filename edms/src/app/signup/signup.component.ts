import { EdmsService } from './../edms.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

name:string=''
email:string=''
password:string=''
confirm_password=''

  constructor(private service:EdmsService) { }

  ngOnInit(): void {
    // localStorage.setItem('language','Python')
  }

send(){

  if(this.password==this.confirm_password){
    let data = {name:this.name,email:this.email,password:this.password}

    this.service.insertData(data).subscribe((responce)=>{
      console.log(responce);

    },(error)=>{})

  }else{
    alert("Password does not match with confirm password");
  }

}


}
