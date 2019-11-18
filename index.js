'use strict';

const express = require('express');
const connection = require('./model/db.js');

const app = express()
app.use(express.static('public'));

app.get('/zoo', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM animal');

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (e) {
        console.log(e);
        res.send('db error...');
    }

});

app.get('/animal',async(req,res) =>{
    console.log(req);
    //res.send(`query prams? ${req.query}`);
    try{
        const [results] = await connection.query(
            'SELECT * FROM animal WHERE name LIKE ?',
            [req.query.name]
        );
        res.json(results);
    }catch (e){
        res.send(`db error ${e}`);
    }
})

app.get('/', (req, res) => {
    res.send('Hello from my node server');
});

app.get('/demo', (req, res) => {
    res.send('demo');
});

app.listen(3000);