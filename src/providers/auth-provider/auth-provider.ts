import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {
  constructor(public af: AngularFireAuth) { }

  signin(email: string, pswd: string) {
    return this.af.auth.signInWithEmailAndPassword(email, pswd
    );

  }

  createAccount(email: string, pswd: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, pswd);
  };

  logout() {
    this.af.auth.signOut();
  }
}

