import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import * as firebase from 'firebase/compat';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(private afMessaging: AngularFireMessaging) {
    this.afMessaging.messages.subscribe(
      (_message: any) => {
        _message.onMessage = _message.onMessage.bind(_message);
        _message.onTokenRefresh = _message.onTokenRefresh.bind(_message);
      }
    )
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      }
    )
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe(
      (payload: any) => {
        console.log("Message Received - ", payload);
        this.currentMessage.next(payload);
      }
    )
  }
}