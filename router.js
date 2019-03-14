const express = require('express');
const server = require('./server.js');

const app = express();
app.use('/api/v2/users', server);
