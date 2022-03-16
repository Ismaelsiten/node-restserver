require('dotenv').config();

const express = require('express');
const Server = require('./models/servers');

const app = express();


const server = new Server();


server.listen();



