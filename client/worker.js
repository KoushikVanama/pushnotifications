self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('push recieved');
    self.registration.showNotification(data.title, {
        body: 'notified by sai koushik',
        icon: 'https://stackify.com/wp-content/uploads/2018/07/Node.js-profilers-881x441.png'
    });
});