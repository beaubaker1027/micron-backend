// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../app");

describe("GET / ", () => {
  test("It should respond with Hello World", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual('hello World!');
    expect(response.statusCode).toBe(200);
  });
});