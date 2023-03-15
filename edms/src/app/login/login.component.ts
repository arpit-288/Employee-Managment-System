import { AuthService } from './../auth.service';
import { SignupComponent } from './../signup/signup.component';
// import { AppRoutingModule } from './../app-routing.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { Route } from "@angular/router";
import { AppRoutingModule } from '../app-routing.module';
import { EdmsService } from './../edms.service';
import { Component, OnInit } from '@angular/core';
import { KeyObject } from 'crypto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''



  constructor(private auth: AuthService, private routes: Router) {  }

  ngOnInit(): void {
  }

  // let obj = {email:this.email,password: this.password}

  clicked() {
    let obj ={email:this.email,password:this.password}
      this.auth.validate(obj).subscribe((response)=>{
        // console.log(response);
        if(response.flag){
          localStorage.setItem('token',response.token)
        this.routes.navigate(['/home']);
        }else if(response.flag==false && response.error==true){
          window.alert("Incorrect Password");
        }else if(response.flag==false && response.error==false){
          window.alert("User doesn't exist");
        }


    })


  }



}
