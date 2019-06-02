// we will use supertest to test HTTP requests/responses
const request = require("supertest");

//environmental variables
const dotenvLoad = require('dotenv-load');

dotenvLoad();
// we also need our app for the correct routes!
const usda = require("../libs/strategies/usda");

describe("usda strategy", ()=>{
  test("search function", ()=>{
    let search = usda.search;
    expect(search()).toEqual(`${process.env.USDA_URL+process.env.USDA_SEARCH_ENDPOINT}?format=json&q=undefined&max=100&offset=0&api_key=${process.env.USDA_API_ACCESS_KEY}`)
    expect(search("test")).toEqual(`${process.env.USDA_URL+process.env.USDA_SEARCH_ENDPOINT}?format=json&q=test&max=100&offset=0&api_key=${process.env.USDA_API_ACCESS_KEY}`)
    expect(search(undefined, 10)).toEqual(`${process.env.USDA_URL+process.env.USDA_SEARCH_ENDPOINT}?format=json&q=undefined&max=100&offset=10&api_key=${process.env.USDA_API_ACCESS_KEY}`)
    expect(search(undefined, undefined, 15)).toEqual(`${process.env.USDA_URL+process.env.USDA_SEARCH_ENDPOINT}?format=json&q=undefined&max=15&offset=0&api_key=${process.env.USDA_API_ACCESS_KEY}`)
  })
  test("getContent function", ()=>{
    let getContent = usda.getContent;
    expect(getContent()).toEqual(`${process.env.USDA_URL+process.env.USDA_REPORTS_ENDPOINT}?ndbno=undefined&type=f&format=json&api_key=${process.env.USDA_API_ACCESS_KEY}`)
    expect(getContent('test')).toEqual(`${process.env.USDA_URL+process.env.USDA_REPORTS_ENDPOINT}?ndbno=test&type=f&format=json&api_key=${process.env.USDA_API_ACCESS_KEY}`)
  })
})