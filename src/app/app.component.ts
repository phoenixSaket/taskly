import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Taskly';
  showLoader: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private loader: LoaderService) {}
  
  ngOnInit(): void {
    if(!this.loginService.isUserLoggedIn) {
      this.router.navigate(["/login"]);
    } else {
      this.router.navigate(["/home"]);
    }

    this.loader.shouldShowLoader().subscribe((shouldShow: boolean) => {
      this.showLoader = shouldShow;
    })
  }

}
