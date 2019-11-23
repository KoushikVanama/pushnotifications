const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const keys = require('./config');

const app = express();
// set static path
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

webpush.setVapidDetails('mailto:test@test.com', keys.publicVapidKey, keys.privateValidKey);

// subscribe route
app.post('/subscibe', (req, res) => {
   // get pushSubscription object
   const subscription = req.body;
   
   // send 201
   res.status(201).json({});

   // create payload
   const payload = JSON.stringify({title: 'Push test'});

   // pass object into sendNotification
   webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
