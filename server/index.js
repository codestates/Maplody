require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const cookieParser = require('cookie-parser');
const controllers = require('./controllers');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

sequelize.sync();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  }),
);

app.use(cookieParser());
app.post('/user-login', controllers.Users);

let server;
// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log('server running at 4000'));
// } else {
console.log(`server running at ${HTTPS_PORT}`);
server = app.listen(HTTPS_PORT);
// }
module.exports = server;
