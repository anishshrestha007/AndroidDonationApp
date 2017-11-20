
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';;
import { ModalController, NavController, App, LoadingController, ToastController, Platform, NavParams, ViewController } from 'ionic-angular';
import { DonationService } from '../../providers/donation-service';
import { AppSettings } from "../appsetting/AppSetting";
import { RequestDonation } from "../requestdonation/requestDonation";
import { UserProvider } from '../../providers/user-provider/user-provider';
//import { Donation } from "./donation";
@Component({
  templateUrl: 'donationdetail.html',
  selector: 'donationdetail-page'
})
export class DonationDetail {
  loading: any;
  public donation_types: any[];
  public donnar_types: any[];
  donationData = { client_id: 1 };
  editData: any;
  uid:string;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public donationService: DonationService,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public http: Http,
    public modelCtrl: ModalController,
    public userProvider:UserProvider
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
     this.userProvider
      .getUid()
      .then(this.assignUid.bind(this));
  }
   assignUid(value) {
           this.uid=value;
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
  onRequestClick(donation): void {
    var requestDonationData = {
      firebase_uid:donation.firebase_uid,
      uid:this.uid,
      description:donation.description,
      receiver_id:donation.created_by,
      donation_id:donation.id
    };
    let modal = this.modelCtrl.create(RequestDonation, requestDonationData
    );
    modal.present();
  }
}