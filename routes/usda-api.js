const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('../private/config');

const apiRequest = {

  requestOptions: {
    getNdbno(foodString, offset=0, max=100) {
      return `${config.usda.search_endpoint}?format=json&q=${foodString}&max=${max}&offset=${offset}&api_key=${config.usda.access_key}`;
    },
    getNutritionalContent(ndbno){
      return `${config.usda.reports_endpoint}?ndbno=${ndbno}&type=f&format=json&api_key=${config.usda.access_key}`
    }

  }
}

router.get('/query', async (req, res)=>{
  const {query, offset, max} = req.query
  await fetch(apiRequest.requestOptions.getNdbno(query, offset, max))
          .then(res=> res.json())
          .then((data) => {
            res.send({
              success:true,
              data: data
            })
          })
          .catch((err) => {
            res.send({
              success:false,
              error:error
            })
          });
});


router.get('/retrieve', async (req, res)=>{
  const {id} = req.query
  await fetch(apiRequest.requestOptions.getNutritionalContent(id))
          .then(res=> res.json())
          .then((data) => {
            res.send({
              success:true,
              data: data
            })
          })
          .catch((err) => {
            res.send({
              success:false,
              error:error
            })
          });
})

module.exports = router;
