const express = require('express');
const cors = require('cors');
const app = express();

const info = require('./routes/usda-api');
const config = require('./private/config');

app.use(cors({
  origin:(origin, callback)=>{
    if(!origin) return callback(null, true);

    if(config.whiteList.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';

      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get('/', (req, res)=>{
  res.status(200).send('hello World!');
})

app.use('/usda-api', info)

module.exports = app;