'use strict';

const express = require('express');
const animal = require('./model/animal');
/* const https =require('http');
const fs = require('fs');

const options = {
    key: fs.readFile('../ca')
} */


const app = express()
const bodyParser = require('body-parser');
app.use(express.static('public'));

app.get('/animals', async (req, res) => {
    try {
      res.json(await animal.getAll());
    } catch (e) {
      console.log(e);
      res.send('db error :(');
    }
  });
  
  app.get('/animal', async (req, res) => {
    console.log(req.query);
    try {
      res.json(await animal.search(req.query.name));
    } catch(e) {
      res.send(`db error`);
    }
  });
  
  app.post('/animal', bodyParser.urlencoded({extended: true}), async (req, res) => {
    console.log(req.body);
    try {
      res.json(await animal.insert(req.body.name));
    } catch (e) {
      console.log(e);
      res.send('db error');
    }
  });

app.get('/', (req, res) => {
    res.send('Hello from my node server');
});

app.get('/demo', (req, res) => {
    res.send('demo');
});

app.listen(3000);