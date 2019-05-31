const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const info = require('./routes/usda-api');
const app = express();

if(process.env.NODE_ENV === "production"){
  app.use(morgan('common'))
}

app.use(helmet());

app.use(cors({
  origin:(origin, callback)=>{
    if(!origin) return callback(null, true);

    if(process.env.WHITE_LIST.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';

      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(compression());

app.use('/usda-api', info)

module.exports = app;