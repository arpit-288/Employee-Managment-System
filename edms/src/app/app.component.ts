// import { Route, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public auth:AuthService, private router: Router){}
  title = 'EDMS';


  ngOnInit():void{
    // this.router.navigate(['/home'])
}


  }




