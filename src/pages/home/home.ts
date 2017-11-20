import { Component } from '@angular/core';
import { donationModel } from "../donation/donationModel";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ModalController, NavController, App, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { DonationService } from "../../providers/donation-service";
import { DonationDetail } from "../donation/DonationDetail";
import { DonationAddModal } from "../mydonation/adddonation";
import { EventAddForm } from "../event/EventAddForm";
import { EventService } from "../../providers/event-service";
import { EventModel } from "../event/EventModel";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  donations: donationModel[] = null;
  events: EventModel[] = null;
  loading: any = null;
  isLoggedIn: boolean = false;
  selectedDonation: donationModel;
  donationData: donationModel;
  selectedEvent: EventModel;
  eventData: EventModel;
  opts = {
    formMode: true
  };
  pet: string = "Donation";

  constructor(public modalCtrl: ModalController, public app: App, public http: Http, public donationService: DonationService, public eventService: EventService, public navCtrl: NavController, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {

  }
  ngOnInit(): void {
    this.getDonations();
    this.getEvents();
  }
  getDonations(): void {
    this.donationService
      .Get()
      .then(this.addignDonationsList.bind(this));
  }
  getEvents(): void {
    this.eventService
      .Get()
      .then(this.assignEventsList.bind(this));
  }
  addignDonationsList(value) {
    if (value.success) {
      this.donations = value.data;
    } else {
      this.loading.dismiss();
      //this.presentToast(value.message);
    }
  }
  assignEventsList(value) {
    if (value.success) {
      this.events = value.data;
    } else {
      this.loading.dismiss();
      //this.presentToast(value.message);
    }
  }
  onSelect(donation: donationModel): void {
    this.selectedDonation = donation;
    this.donationData = donation;
    let modal = this.modalCtrl.create(DonationDetail, this.donationData);
    modal.present();
  }
  onSelectEvent(event: EventModel): void {
    this.eventData = event;

    let modal = this.modalCtrl.create(EventAddForm, this.eventData, this.opts);
    modal.present();
  }
  openAddForm() {
    let modal = this.modalCtrl.create(DonationAddModal);
    modal.present();
  }
  openEventAddForm() {
    let modal = this.modalCtrl.create(EventAddForm);
    modal.present();
  }
  doRefresh(refresher) {
    this.getDonations();
    this.getEvents();
    setTimeout(() => {
      refresher.complete();
    });
  }
}
