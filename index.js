const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Web shop app');
});

const sequelize = require('./utils/db');

sequelize
    .authenticate()
    .then(() => {
      console.log('Connected to database');
    })
    .catch(err => {
      console.error('Error connecting to database:', err);
    });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});