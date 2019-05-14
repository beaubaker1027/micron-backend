const express = require('express');
const cors = require('cors');
const app = express();

const info = require('./routes/usda-api');
const config = require('./private/config');

app.use(cors());

app.get('/', (req, res)=>{
  res.send('hello World!');
})

app.use('/usda-api', info)

app.listen(config.port, ()=>{console.log(`App listening on port ${config.port}`)})
