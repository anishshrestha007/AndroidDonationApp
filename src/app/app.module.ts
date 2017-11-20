import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DonationService } from "../providers/donation-service";

//login and register
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { AuthService } from "../providers/auth-service";
import { DonationDetail } from "../pages/donation/DonationDetail";
import { MyDonation } from "../pages/mydonation/mydonation";
import { DonationAddModal } from "../pages/mydonation/adddonation";
import { EventService } from "../providers/event-service";
import { EventAddForm } from "../pages/event/EventAddForm";
import { RequestDonation } from "../pages/requestdonation/requestDonation";
import { RequestDonationService } from "../providers/request-donation-service";

//firebase database related
import { AuthProvider } from '../providers/auth-provider/auth-provider';
import { ChatsProvider } from "../providers/chats-provider/chats-provider";
import { UserProvider } from "../providers/user-provider/user-provider";
import { InboxPage } from "../pages/inbox/inbox";
import { ChatViewPage } from "../pages/chat-view/chat-view";
import { Storage } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDo2gn4BYQ8bHNV6mZQIX_kzW8RzqZ3wJ4",
  authDomain: "donationwebapp.firebaseapp.com",
  databaseURL: "https://donationwebapp.firebaseio.com",
  storageBucket: "donationwebapp.appspot.com",
   messagingSenderId: "706102616999"
};


@NgModule({
  declarations: [
   MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    DonationDetail,
    MyDonation,
    DonationAddModal,
    EventAddForm,
    RequestDonation,
    InboxPage,
    ChatViewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    DonationDetail,
    MyDonation,
    DonationAddModal,
    EventAddForm,
    RequestDonation,
    InboxPage,
    ChatViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DonationService,
    AuthService,
    EventService,
    RequestDonationService,
    AuthProvider,
    AngularFireAuthModule,
    AngularFireAuth,
    ChatsProvider,
    AngularFireDatabase,
    UserProvider,
    Storage
  ]
})
export class AppModule { }
