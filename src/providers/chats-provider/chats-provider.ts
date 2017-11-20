import { Injectable } from '@angular/core';
import { AngularFireDatabase  } from 'angularfire2/database';
import { UserProvider } from '../user-provider/user-provider';

@Injectable()
export class ChatsProvider {
  constructor(public afd: AngularFireDatabase, public up: UserProvider) {}
  // get list of Chats of a Logged In User
  getChats() {
     return this.up.getUid().then(uid => {
        let chats = this.afd.list(`/users/${uid}/chats`);
        return chats;
     });
  }
  
  // Add Chat References to Both users
  addChats(uid,interlocutor) {
      // First User
      let endpoint = this.afd.object(`/users/${uid}/chats/${interlocutor}`);
      endpoint.set(true);
      
      // Second User
      let endpoint2 = this.afd.object(`/users/${interlocutor}/chats/${uid}`);
      endpoint2.set(true);
  }

  getChatRef(uid, interlocutor) {
      debugger;
      let firstRef = this.afd.object(`/chats/${uid},${interlocutor}`, {preserveSnapshot:true});
      let promise = new Promise((resolve, reject) => {
          firstRef.subscribe(snapshot => {
                let a = snapshot.exists();
                if(a) {
                    resolve(`/chats/${uid},${interlocutor}`);
                } else {
                    let secondRef = this.afd.object(`/chats/${interlocutor},${uid}`, {preserveSnapshot:true});
                    secondRef.subscribe(snapshot => {
                        let b = snapshot.exists();
                        if(!b) {
                            this.addChats(uid,interlocutor);
                        }
                    });
                    resolve(`/chats/${interlocutor},${uid}`);
                }
            });
      });
      
      return promise;
  }
}

