importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing config from network or cache if possible
// We will set up a placeholder since we don't have the explicit config in SW scope easily,
// but usually FCM needs the sender ID at minimum.

// To keep the service worker from crashing if not fully configured with FCM sender keys:
try {
  firebase.initializeApp({
    messagingSenderId: "1234567890" // Placeholder
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title || 'Schools Eswatini';
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/icon-192x192.svg'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.log("Firebase Messaging skipped in SW (expected during dev/preview): ", e);
}
