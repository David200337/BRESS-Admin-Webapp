// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyB9vdPmwdaJLe5uu1EEi734oo2X7jgC8HI",
    authDomain: "bress-4e9d4.firebaseapp.com",
    projectId: "bress-4e9d4",
    storageBucket: "bress-4e9d4.appspot.com",
    messagingSenderId: "956526786585",
    appId: "1:956526786585:web:32593485b12b24b5d45288",
    measurementId: "G-T4KMLF7CSF"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();