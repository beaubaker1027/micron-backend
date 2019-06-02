const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//strategy that contains a search function and a getContent function
const requestOptions = require('../libs/strategies/usda')

const apiRequest = {
  requestOptions
}

router.get('/query', async (req, res)=>{
  const {query, offset, max} = req.query
  await fetch(apiRequest.requestOptions.search(query, offset, max))
          .then(res=>{
            return res;
          })
          .then(res=> res.json())
          .then(res=> {
            if(res.errors){
              throw(res.errors.error[0]);
            }
            return res;
          })
          .then((data) => {
            res.status(200).send({
              success:true,
              data: data
            })
          })
          .catch((err) => {
            res.status(err.status).send({
              success:false,
              error:err.message
            })
          });
});


router.get('/retrieve', async (req, res)=>{
  const {id} = req.query
  await fetch(apiRequest.requestOptions.getContent(id))
          .then(res => res.json())
          .then(res => {
            if(res.errors){
              throw(res.errors.error[0]);
            }
            return res;
          })
          .then((data) => {
            res.status(200).send({
              success:true,
              data: data
            })
          })
          .catch((err) => {
            res.status(err.status).send({
              success:false,
              error:err.message
            })
          });
})

module.exports = router;
