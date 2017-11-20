import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from "../home/home";
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { AuthProvider } from "../../providers/auth-provider/auth-provider";
import { UserProvider } from '../../providers/user-provider/user-provider';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = { username: '', password: '', client_id: 1 };
  regData = { email: '', password: '', client_id: 1, firebase_uid: '' };
  data: any;
  constructor(public navCtrl: NavController,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public auth: AuthProvider,
    public local: Storage,
    public userProvider: UserProvider
  ) { }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData).then(this.conditionalChaining.bind(this));
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      cssClass: 'toast-error',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  conditionalChaining(value) {
    if (value.success) {
      this.data = value;
      localStorage.setItem('token', this.data.token);
      localStorage.setItem('user_id', this.data.user_id);
      this.signin();
    } else {
      this.loading.dismiss();
      this.presentToast(value.message);
    }
  }

  signin() {
    this.auth.signin(this.data.email, this.loginData.password).then(this.signInChaining.bind(this));
  };
  signInChaining(value) {
    this.local.set('uid', value.uid);
    this.loading.dismiss();
    this.navCtrl.setRoot(HomePage);
  }

  //registration progcess
  doSignup() {
    this.showLoader();
    this.authService.register(this.regData).then((result) => {
      this.loading.dismiss();
      this.presentToast("Success! Your registration is completed.");
      // this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  createAccount() {
    let credentials = this.regData;
    this.auth.createAccount(this.regData.email, this.regData.password)
      .then((data) => {
        this.local.set('uid', data.uid);
        this
          .regData.firebase_uid = data.uid;
        this.userProvider.createUser(credentials, data.uid);
        this.doSignup();
      }, (error) => {
        // let alert = this.util.doAlert("Error",error.message,"Ok");
        //alert.present();
      });
  };
}
