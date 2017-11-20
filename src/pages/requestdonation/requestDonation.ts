import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController, LoadingController, NavController, ToastController, Content } from 'ionic-angular';
import { RequestDonationService } from '../../providers/request-donation-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChatsProvider } from '../../providers/chats-provider/chats-provider';
import { UserProvider } from '../../providers/user-provider/user-provider';
@Component({
  selector: 'request-donation',
  templateUrl: 'requestDonation.html'
})
export class RequestDonation {
 message: string;
  uid:string;
  interlocutor:string;
  chats:FirebaseListObservable<any>;  
  @ViewChild(Content) content: Content;
  requestDonationData = { client_id: 1,sender_id:null };
  loading: any;
  constructor(
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public requestDonationService:RequestDonationService,
     public chatsProvider:ChatsProvider, 
     public afd:AngularFireDatabase, 
     public userProvider:UserProvider
     ) 
    {
     this.uid = navParams.data.uid;
     this.interlocutor = navParams.data.firebase_uid;
     this.requestDonationData = navParams.data;
 // Get Chat Reference
    chatsProvider.getChatRef(this.uid, this.interlocutor)
    .then((chatRef:any) => {  
        this.chats = this.afd.list(chatRef);
    });
  }
  sendMessage() {
      if(this.message) {
          let chat = {
              from: this.uid,
              message: this.message,
              type: 'message'
          };
          this.chats.push(chat);
          this.message = "";
      }
      this.viewCtrl.dismiss();
  };
  onDismiss() {
    this.viewCtrl.dismiss();
  }
  postRequest() {
    this.requestDonationData.client_id=1;
    this.requestDonationData.sender_id=localStorage.getItem("user_id");
    this.showLoader();
    this.requestDonationService.postRequest(this.requestDonationData).then((result) => {
      this.loading.dismiss();
      this.presentToast("your message has been sent to donnar");
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Registering...'
    });

    this.loading.present();
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
