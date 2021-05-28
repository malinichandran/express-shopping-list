process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let icecream = {name: "Icecream", price: 2.00}
 
beforeEach(function(){
    items.push(icecream);
});

afterEach(function(){
    items.length = 0;
});

describe("GET /items", function(){
    test("Gets a list of items", async function(){
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [icecream]});
    });
});

describe("GET /cats/:name", function(){
    test("Gets a single item", async function(){
        const res = await request(app).get(`/items/${icecream.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item:icecream});
    });

    test("Responds with 404 if can't find item", async function(){
        const res = await request(app).get(`items/0`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", function(){
    test("Creates a new item", async function(){
        const res = await (await request(app).post(`/items`)).send({name:"Tomato",price:1.40});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            item: {name:"Tomato"}
        });
    });
});

describe("PATCH /items/:name", function(){
    test("Updates a single item", async function(){
        const res = await (await request(app).patch(`/items/${icecream.name}`)).send({name:"Onion"});
        expect(res.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: {name:"Onion"}
        });
    });
    test("Responds with 404 if id invalid", async function() {
        const res = await request(app).patch(`/items/0`);
        expect(res.statusCode).toBe(404);
      });
});


describe("DELETE /items/:name", function() {
    test("Deletes a single a item", async function() {
      const resp = await request(app).delete(`/items/${icecream.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ message: "Deleted" });
    });
  });