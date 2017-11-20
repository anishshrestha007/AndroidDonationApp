
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';;
import { ModalController, NavController, App, LoadingController, ToastController, Platform, NavParams, ViewController } from 'ionic-angular';
import { DonationService } from '../../providers/donation-service';
import { MyDonation } from "./mydonation";
import { AppSettings } from "../appsetting/AppSetting";
@Component({
  selector: 'adddonation-modal',
  templateUrl: 'adddonationmodel.html'

})
export class DonationAddModal {
  loading: any;
  public donation_types: any[];
  public donnar_types: any[];
  donationData = { client_id: 1 };
  editData: any;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public donationService: DonationService,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public http: Http,
    public modelCtrl: ModalController


  ) {
    this.donationData = params.data;
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
  ngOnInit(): void {
    this.getDonnarType();
    this.getDonationType();
  }
  getDonationType(): void {
    this.donationService
      .loadComboData(AppSettings.api_endpoint + 'DonationType/combo/page/0/page_size/0/sort_by')
      .then(this.conditionalChaining.bind(this));
  }
  getDonnarType(): void {
    this.donationService
      .loadComboData(AppSettings.api_endpoint + 'Donor/combo/page/0/page_size/0/sort_by')
      .then(this.assignDonnarType.bind(this));
  }
  assignDonnarType(value) {
    if (value.success) {
      this.donnar_types = value.data;
    } else {
      this.loading.dismiss();
      this.presentToast(value.message);
    }
  }
  conditionalChaining(value) {
    if (value.success) {
      this.donation_types = value.data;
    } else {
      this.loading.dismiss();
      this.presentToast(value.message);
    }
  }
  postDonation() {
    this.showLoader();
    this.donationService.postDonation(this.donationData).then((result) => {
      this.loading.dismiss();
      this.presentToast("your donation has been posted. Please wait for the Admin approve!!!!!!!");
      this.navCtrl.pop();
      let my_donation: MyDonation = new MyDonation(this.donationService, this.navCtrl, this.toastCtrl, this.params, this.http, this.modelCtrl)
      my_donation.getHeroes();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
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
}