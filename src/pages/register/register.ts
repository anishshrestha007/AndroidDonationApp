import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AuthProvider } from "../../providers/auth-provider/auth-provider";
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user-provider/user-provider';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  loading: any;
  regData = { email: '', password: '', client_id: 1, firebase_uid: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public auth: AuthProvider,
    public storage: Storage,
    public userProvider: UserProvider,
  ) { }

  doSignup() {
    this.showLoader();
    this.authService.register(this.regData).then((result) => {
      this.loading.dismiss();
      this.presentToast("Success! Your registration is completed.");
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  createAccount() {
    let credentials = this.regData;
    this.auth.createAccount(this.regData.email, this.regData.password)
      .then((data) => {
        this.storage.set('uid', data.uid);
        this
          .regData.firebase_uid = data.uid;
        this.userProvider.createUser(credentials, data.uid);
        this.doSignup();
      }, (error) => {
        // let alert = this.util.doAlert("Error",error.message,"Ok");
        //alert.present();
      });
  };
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Registering...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      cssClass: 'toast-success',
      dismissOnPageChange: false
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
