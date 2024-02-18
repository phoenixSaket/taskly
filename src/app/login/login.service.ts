import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isUserLoggedIn: boolean = true;
  public user: User = {
    name: '',
    email: '',
    phone: '',
    username: ''
  };

  private baseURL: string = "https://pink-silly-lion.cyclic.app/";
  private loginURL: string = this.baseURL + "user/login";
  private signUpURL: string = this.baseURL + "user/signup";

  constructor(private http: HttpClient) { }

  login(values: { username: string, password: string }) : Observable<any> {
    return this.http.post(this.loginURL, values);
  }
}

export interface User {
  email: string,
  phone: string,
  username: string,
  name: string
}
