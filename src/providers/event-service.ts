import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { EventModel } from "../pages/event/EventModel";
import { AppSettings } from "../pages/appsetting/AppSetting";
@Injectable()
export class EventService {
  constructor(public http: Http) { }
  postEvent(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', localStorage.getItem("token"));
      headers.append('user_id', localStorage.getItem("user_id"));
      this.http.post(AppSettings.api_endpoint + 'Event', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  Get(): Promise<EventModel[]> {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', localStorage.getItem("token"));
      headers.append('user_id', localStorage.getItem("user_id"));
      let params: URLSearchParams = new URLSearchParams();
      params.set('created_by', localStorage.getItem("user_id"));
      let options = new RequestOptions({
        search: params,
        headers: headers
      });
      return this.http.get(AppSettings.api_endpoint + 'Event', options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }
  loadComboData(url) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', localStorage.getItem("token"));
      headers.append('user_id', localStorage.getItem("user_id"));
      this.http.get(url, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}


