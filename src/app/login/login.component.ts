import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private loginService: LoginService, private router: Router, private loader: LoaderService) { }

  inputChanged(type: string, event: any) {
    try {
      const value = event.target.value;
      switch (type) {
        case "username":
          this.username = value;
          break;
        case "password":
          this.password = value;
          break;
        default:
          break;
      }
    } catch (err: any) {
      console.log("Error: ", err);
    }
  }

  login() {
    try {
      this.loader.showLoader();
      this.loginService.login({ username: this.username, password: this.password }).subscribe((response: any)=> {
        console.log("Response", response);
        if(response.status == 0) {
          this.loginService.user = response.user; 
          this.loginService.isUserLoggedIn = true;
          this.loader.hideLoader();
          this.router.navigate(["/home"]);
        } else {
          console.log("Invalid User: ", response);
        }
      })
    } catch (err: any) {
      console.log("Error: ", err);
    }
  }
}
