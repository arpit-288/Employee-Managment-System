import { EdmsService } from './edms.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  // private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this._isLoggedIn$.asObservable();
  isLoggedIn$:boolean = false;


  constructor(private service : EdmsService) { }

 validate(obj:{email:string,password:string}){

  return this.service.validate(obj).pipe(tap((response)=>{
    localStorage.setItem('token',response.token)
    this.isLoggedIn$ = true

    // console.log(this.isLoggedIn$);
    console.log(response.token);
  }))

 }

 getAuthStatus(){
  console.log(this.isLoggedIn$,"Getting Authentication Status");
  return this.isLoggedIn$;
 }

}


// .pipe(tap((response:any)=>{
//   console.log(response.  );
//  localStorage.setItem('hello auth',response.token)
//  this._isLoggedIn$.next(true);
// })
// );
