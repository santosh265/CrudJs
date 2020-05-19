const express = require('express');
const app = express();
app.get('/', function (req, res) {
    console.log("Running...");
    res.send('Hello World');
  })
  app.get('/alien',  (req, res) => {
    const sender = {
      id:100,
      name:"Santosh"
    }
    res.send(sender.name);
  })
   
  app.listen(9000)