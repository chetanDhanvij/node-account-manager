import app from "./app"
import request from "supertest"

describe("POST /accounts", () => {
  describe("Given a valid Account Details", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/accounts").send({
        accountName: "chetan Dhanvij",
        accountNumber: "45645645645",
        accountType: "SAVING",
        currency: "NOK"
      })
      expect(response.statusCode).toBe(200)
    })

    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/accounts").send({
        accountName: "chetan Dhanvij",
        accountNumber: "45645645645",
        accountType: "SAVING",
        currency: "NOK"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    
    test("response has id", async () => {
      const response = await request(app).post("/accounts").send({
        accountName: "chetan Dhanvij",
        accountNumber: "45645645645",
        accountType: "SAVING",
        currency: "NOK"
      })
      expect(response.body.id).not.toBeNull()
    })
  })

  describe("GET /accounts", () => {
    test("response has ids", async () => {
      const response = await request(app).get("/accounts").send()
      console.log()
      expect(response.body.filter(d => !d.id).length).toBe(0)
    })
  })

  describe("PATCH /accounts", () => {
    test("should update name", async () => {
      const UPDATED_NAME = "updated name";
      const response = await request(app).get("/accounts").send()
      const account = response.body[0];
      console.log(account)

      const responsePatch = await request(app).patch("/accounts/" + account.id).send({
        accountName: UPDATED_NAME,
      })
      expect(responsePatch.body.accountName).toBe(UPDATED_NAME)
    })
  })

})