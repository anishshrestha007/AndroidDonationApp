
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';;
import { ModalController, NavController, App, LoadingController, ToastController, Platform, NavParams, ViewController } from 'ionic-angular';
import { EventModel } from "./EventModel";
//import { MyNewEvent } from '../event/EventAddModel';
//import { EventService } from '../../providers/event-service';

@Component({
  templateUrl: 'EventDetail.html',
  selector: 'EventDetail'
})
export class MyEvents {
  item;
  loading: any;
  data: any;
event: EventModel[] = null;
  constructor( public navCtrl: NavController, private toastCtrl: ToastController, params: NavParams, public http: Http, public modalCtrl: ModalController) {
    this.item = params.data.item;
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }}

