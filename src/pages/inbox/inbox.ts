import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { UserProvider } from '../../providers/user-provider/user-provider';
import { ChatViewPage } from "../chat-view/chat-view";

@Component({
    templateUrl: 'inbox.html'
})
export class InboxPage {
    users: FirebaseListObservable<any[]>;
    uid: string;
    constructor(public nav: NavController, public userProvider: UserProvider) { }
    ngOnInit(): void {
        this.userProvider
            .getUid()
            .then(this.assignDonnarType.bind(this));
    }
    assignDonnarType(value) {
        this.uid = value;
        this.users = this.userProvider.getAllUsers();
    }
    openChat(key) {
        let param = { uid: this.uid, interlocutor: key };
        this.nav.push(ChatViewPage, param);
    }
}