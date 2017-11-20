import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from "../pages/appsetting/AppSetting";

let apiUrl = 'http://localhost:44862/api/';
let serviceUrl = 'http://192.168.4.126/website/api/';
@Injectable()
export class AuthService {

  constructor(public http: Http) { }
  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(AppSettings.api_endpoint + 'auth/authenticate', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(AppSettings.api_endpoint + 'Register/registeruser', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('X-Auth-Token', localStorage.getItem('token'));
      // headers.append('Access-Control-Allow-Origin','http://localhost:44862');
      this.http.post(AppSettings.api_endpoint + 'Logout', {}, { headers: headers })
        .subscribe(res => {
          localStorage.clear();
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}
