
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';;
import { ModalController, NavController, App, LoadingController, ToastController, Platform, NavParams, ViewController } from 'ionic-angular';
import { EventService } from "../../providers/event-service";
import { AppSettings } from "../appsetting/AppSetting";
@Component({
  selector: 'event-add-form',
  templateUrl: 'EventAddForm.html'
})
export class EventAddForm {
  loading: any;
  eventData = { client_id: 1, formMode: "edit" };
  org_type: any[];
  event_type: any[];
  formMode: string = null;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public eventService: EventService
  ) {
    this.eventData = params.data;
    this.formMode = params.data.opts.formMode;
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Registering...'
    });

    this.loading.present();
  }
  postEvent() {
    this.showLoader();
    this.eventService.postEvent(this.eventData).then((result) => {
      this.loading.dismiss();
      this.presentToast("your event has been posted. Please wait for the Admin approve!.");
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }
  ngOnInit(): void {
    this.getOrgType();
    this.getEventType();
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
  }
  getOrgType(): void {
    this.eventService
      .loadComboData(AppSettings.api_endpoint + 'OrgType/combo/page/0/page_size/0/sort_by')
      .then(this.assignOrgType.bind(this));
  }
  getEventType(): void {
    this.eventService
      .loadComboData(AppSettings.api_endpoint + 'EventType/combo/page/0/page_size/0/sort_by')
      .then(this.assignEventTypeCombo.bind(this));
  }
  assignOrgType(value) {
    if (value.success) {
      this.org_type = value.data;
    } else {
      this.loading.dismiss();
      this.presentToast(value.message);
    }
  }
  assignEventTypeCombo(value) {
    if (value.success) {
      this.event_type = value.data;
    } else {
      this.loading.dismiss();
      this.presentToast(value.message);
    }
  }
}