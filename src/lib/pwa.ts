export function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
    return;
  }
  
  if (Notification.permission === 'granted') {
    console.log('Notification permission already granted.');
    registerPushSubscription();
    return;
  }
  
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        registerPushSubscription();
      }
    });
  }
}

function registerPushSubscription() {
  navigator.serviceWorker.ready.then((registration) => {
    // In a real application, you would use registration.pushManager.subscribe
    // using your VAPID key and send the subscription to your backend.
    console.log('Service Worker is ready. Push subscription can be registered here.', registration);
  });
}
