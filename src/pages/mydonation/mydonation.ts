
import { Http, Headers, RequestOptions } from '@angular/http';
import { Component, ChangeDetectorRef, Input } from '@angular/core';;
import { ModalController, NavController, App, LoadingController, ToastController, Platform, NavParams, ViewController } from 'ionic-angular';
import { DonationAddModal } from '../mydonation/adddonation';
import { DonationService } from '../../providers/donation-service';
import { DonationModel } from '../mydonation/mydonationmodel';
//import { DonationRequestModel } from "../donationrequest/donationrequestmodel";
//import { DonationRequest } from "../donationrequest/donationrequest";

@Component({
  templateUrl: 'mydonation.html',
  selector: 'mydonation-page'
})
export class MyDonation {
  @Input()
  item;
  status:boolean;
  loading: any;
  data: any;
  selectedDonor: DonationModel;
  donationData: DonationModel;
  donations: DonationModel[] = null;
  //DonationRequests: DonationRequestModel[] = null;
  constructor(public donationService: DonationService, public navCtrl: NavController, private toastCtrl: ToastController, params: NavParams, public http: Http, public modalCtrl: ModalController) {
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
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.donationService
      .Get()
      .then(this.conditionalChaining.bind(this));
  }
  conditionalChaining(value) {
    if (value.success) {
      this.donations = value.data;
      if(value.data.approximate_value==1000)
      {
        this.status=true;
      }
    } else {
      this.loading.dismiss();
      this.presentToast(value.message);
    }
  }
  openAddForm() {
    let modal = this.modalCtrl.create(DonationAddModal);
    modal.present();
  }
  onSelect(hero: DonationModel): void {
    this.selectedDonor = hero;
    this.donationData = hero;
    let modal = this.modalCtrl.create(DonationAddModal, this.donationData);
    modal.present();
  }
  // onRequestDetailClick(drns): void {
  //   this.donationService
  //     .getDonationRequestUser(drns)
  //     .then(this.requestDetailCallBack.bind(this));
  //   }
  // requestDetailCallBack(value) {
  //   debugger;
  //   if (value.success) {
  //     this.DonationRequests = value.data;
  //     let modal = this.modalCtrl.create(DonationRequest, this.DonationRequests);
  //     modal.present();
  //   } else {
  //     this.loading.dismiss();
  //     this.presentToast(value.message);
  //   }
  // }
}

