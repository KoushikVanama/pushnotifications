const publiVapidKey = 'BFqVxITJH7rQ1nSP2fktPetlazX0OBKzpg-P2EzB8S6bSrEo2L4Y3ptPuCafNq_I6Ap3gs7bvl-_IQBXlPNaF3U';

// check for service worker
if('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

// register sw, register push, send push
async function send(){
    // register sw
    console.log('registering sw');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('sw registered');
    // register push
    console.log('registering push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publiVapidKey)
    });
    console.log('push registered');
    // send push notification
    console.log('sending push..');
    await fetch('/subscibe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push sent..');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
