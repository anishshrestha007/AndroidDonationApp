import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
@Injectable()
export class UserProvider {
  constructor(public afd: AngularFireDatabase, public local: Storage) { }


  getUid() {
    return this.local.get('uid');
  }
  // Get Current User's UID

  // Create User in Firebase
  createUser(userCredentails, uid) {
    let currentUserRef = this.afd.object(`/users/${uid}`);
    console.log(userCredentails);
    currentUserRef.set({ email: userCredentails.email });
  }

  // Get Info of Single User
  getUser() {
    // Getting UID of Logged In User
    return this.getUid().then(uid => {
      return this.afd.object(`/users/${uid}`);
    });
  }


  // Get All Users of App
  getAllUsers() {
    var uid = this.local.get('uid');
    return this.afd.list('/users/${uid}/chats');

  }
  getMessageUserInInbx(){
     return this.getUid().then(uid => {
      return this.afd.object(`users/${uid}/chats`);
    });
  }
  getIncomingChats() {
   var uid = "jXylgYaLEVh1663eGm5U8TfS9gF2";
   var interlocutor ='jXylgYaLEVh1663eGm5U8TfS9gF2';
    this.afd.object(`users/${uid}/chats`, {
      preserveSnapshot: true,
    })
      .subscribe(snapshots => {
               console.log("Here is a snapshot!!");
        snapshots.forEach(snapshot => {
   
          console.log(snapshot.key, snapshot.val());
        });
      })
  }

  // Get base64 Picture of User
  getPicture() {
    let base64Picture;
    let options = {
      destinationType: 0,
      sourceType: 0,
      encodingType: 0
    };

    //   let promise = new Promise((resolve, reject) => {
    //        Camera.getPicture(options).then((imageData) => {
    //             base64Picture = "data:image/jpeg;base64," + imageData;
    //             resolve(base64Picture);
    //         }, (error) => {
    //             reject(error);
    //       });

    //   });
    //   return promise;
  }

  // Update Provide Picture of User
  updatePicture() {
    // this.getUid().then(uid => {
    //   let pictureRef = this.afd.object(`/users/${uid}/picture`);
    //   this.getPicture()
    //   .then((image) => {
    //       pictureRef.set(image);
    //   });
    // });
  }
}

