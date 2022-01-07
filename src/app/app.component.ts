import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { getMessaging, onMessage } from 'firebase/messaging';
import { LoaderToggleService } from './services/loader-toggle.service';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'bress-admin-webapp';
  message: any;

  constructor(public loaderToggle: LoaderToggleService, private messagingService: MessagingService) { }

  ngOnInit(): void {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage
    this.message = this.messagingService.currentMessage

  }


}
