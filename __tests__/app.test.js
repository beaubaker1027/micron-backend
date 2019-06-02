// we will use supertest to test HTTP requests/responses
const request = require("supertest");
//use nock to mock api calls
const nock = require("nock");

//environmental variables
const dotenvLoad = require('dotenv-load');

dotenvLoad();
// we also need our app for the correct routes!
const app = require("../app");

let returnValue = {"list": {
    "ds": "any",
    "end": 4,
    "group": "",
    "item": [
    {
    "ds": "SR",
    "group": "Lamb, Veal, and Game Products",
    "manu": "none",
    "name": "Lamb, New Zealand, imported, testes, raw",
    "ndbno": "17377",
    "offset": 0,
  },
  {
  "ds": "SR",
  "group": "Lamb, Veal, and Game Products",
  "manu": "none",
  "name": "Lamb, New Zealand, imported, testes, cooked, soaked and fried",
  "ndbno": "17376",
  "offset": 1,
},
{
  "ds": "LI",
  "group": "Branded Food Products Database",
  "manu": "Hannaford Bros. Co.",
  "name": "HANNAFORD, GENTLE TEST OLIVE OIL, UPC: 041268195633",
  "ndbno": "45173880",
  "offset": 2,
},
{
  "ds": "LI",
  "group": "Branded Food Products Database",
  "manu": "Bytelady Publishing",
  "name": "THE GORHAM GRIND, ROCKET FUEL HIGH-TEST COFFEE MILK, UPC: 804551756771",
  "ndbno": "45169124",
  "offset": 3,
},
],
"q": "test",
"sort": "r",
"sr": "1",
"start": 0,
"total": 4,
}}

let queryError = {
  errors:{
    error:[{
      status: 400,
      parameter: 'results',
      message: 'Your search resulted in zero results.Change your parameters and try again'
    }]
  }
}


let searchError = {
  errors:{
    error:[{
      message: "Check the format of ndbno",
      parameter: "ndbno",
      status: 400
    }]
  }
}

let mock;

describe("Requests", ()=> {
  describe("GET /usda-api/query ", () => {
    beforeEach(()=>{
      nock(`${process.env.USDA_URL}`)
        .log(console.log)
        .get(`${process.env.USDA_SEARCH_ENDPOINT}`)
        .query({format:"json", q:"test", max:"15", offset:"0", api_key:process.env.USDA_API_ACCESS_KEY})
        .reply(200, returnValue)
        .get(`${process.env.USDA_SEARCH_ENDPOINT}`)
        .query({format:"json", q:"undefined", max:"15", offset:"0", api_key:process.env.USDA_API_ACCESS_KEY})
        .reply(400, queryError)
    })
    afterAll(() => {
      nock.cleanAll()
      nock.enableNetConnect()
    });
    test("It should respond with status 200 and correct response", async () => {
      const response = await request(app).get("/usda-api/query?query=test&offset=0&max=15");
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(returnValue);
    });
    test("It should respond with an error when a query is undefined", async()=>{
      const response = await request(app).get("/usda-api/query?offset=0&max=15")
      let {status, message} = queryError.errors.error[0];
      expect(response.statusCode).toBe(status);
      expect(response.body.error).toEqual(message);
    })
  });

  describe("GET /usda-api/retrieve", ()=>{
    describe("GET /usda-api/query ", () => {
      beforeEach(()=>{
        nock(`${process.env.USDA_URL}`)
          .log(console.log)
          .get(`${process.env.USDA_REPORTS_ENDPOINT}`)
          .query({ndbno:"correctId", type:"f", format:"json", api_key: process.env.USDA_API_ACCESS_KEY})
          .reply(200, {type:'success'})
          .get(`${process.env.USDA_REPORTS_ENDPOINT}`)
          .query({ndbno:"invalidId", type:"f", format:"json", api_key: process.env.USDA_API_ACCESS_KEY})
          .reply(400, searchError)
          .get(`${process.env.USDA_REPORTS_ENDPOINT}`)
          .query({ndbno:"undefined", type:"f", format:"json", api_key: process.env.USDA_API_ACCESS_KEY})
          .reply(400, searchError)
      })
      afterAll(() => {
        nock.cleanAll()
        nock.enableNetConnect()
      });
    test("It should respond with status 200 and correct response", async () => {
      const response = await request(app).get("/usda-api/retrieve?id=correctId");
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual({type:'success'});
    });
    test("It should respond with error when search is invalid", async () => {
      const response = await request(app).get("/usda-api/retrieve?id=invalidId");
      let { status, message } = searchError.errors.error[0];
      expect(response.statusCode).toBe(status);
      expect(response.body.error).toEqual(message);
    });
    test("It should throw an error when a search is undefined", async ()=> {
      const response = await request(app).get("/usda-api/retrieve");
      let { status, message } = searchError.errors.error[0];
      expect(response.statusCode).toBe(status);
      expect(response.body.error).toEqual(message);
    })
  })
  })

})