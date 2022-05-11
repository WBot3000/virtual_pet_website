const express = require('express');
const app = express();
const configRoutes = require('./routes');

var cors = require('cors');
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
configRoutes(app);

app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3001');
});