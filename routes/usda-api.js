const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const apiRequest = {

  requestOptions: {
    getNdbno(foodString, offset=0, max=100) {
      return `${process.env.USDA_SEARCH_ENDPOINT}?format=json&q=${foodString}&max=${max}&offset=${offset}&api_key=${process.env.USDA_API_ACCESS_KEY}`;
    },
    getNutritionalContent(ndbno){
      return `${process.env.USDA_REPORTS_ENDPOINT}?ndbno=${ndbno}&type=f&format=json&api_key=${process.env.USDA_API_ACCESS_KEY}`
    }

  }
}

router.get('/query', async (req, res)=>{
  const {query, offset, max} = req.query
  await fetch(apiRequest.requestOptions.getNdbno(query, offset, max))
          .then(res=> res.json())
          .then((data) => {
            res.status(200).send({
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
            res.status(200).send({
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
