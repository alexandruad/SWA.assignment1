const express = require('express')
const body_parser = require('body-parser')

const app = express()
app.use(express.static('static'))

app.use(body_parser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
  });

app.listen(9090, () => console.log("Server is listening on 9090"))