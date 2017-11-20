import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { donationModel } from "../pages/donation/donationModel";
import { AppSettings } from "../pages/appsetting/AppSetting";
let apiUrl = 'http://localhost:44862/api';
let serviceUrl = 'http://192.168.4.126/website/api/';
@Injectable()
export class DonationService {
  constructor(public http: Http) { }
  Get(): Promise<donationModel[]> {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', localStorage.getItem("token"));
      headers.append('user_id', localStorage.getItem("user_id"));
      return this.http.get(AppSettings.api_endpoint + '/Donation', { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  requestDonation(donation_id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', localStorage.getItem("token"));
      headers.append('user_id', localStorage.getItem("user_id"));
      this.http.post(AppSettings.api_endpoint + '/DonationRequest', { donation_id: donation_id, requested_user_id: localStorage.getItem("user_id") }, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  postDonation(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', localStorage.getItem("token"));
      headers.append('user_id', localStorage.getItem("user_id"));
      if (data.id) {
        // headers.append('Access-Control-Allow-Origin',"*");
        this.http.put(AppSettings.api_endpoint + 'Donation' + "/" + data.id, JSON.stringify(data), { headers: headers })
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
      }
      else {
        this.http.post(AppSettings.api_endpoint + 'Donation', JSON.stringify(data), { headers: headers })
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
      }

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
  getDonationRequestUser(record) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('token', localStorage.getItem("token"));
      headers.append('user_id', localStorage.getItem("user_id"));
      this.http.get(AppSettings.api_endpoint + '/DonationRequest/?donation_id=' + record.id, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
