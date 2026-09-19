import { describe, test, expect } from "vitest"
import request from "supertest"
import app from "../src/app.js"

describe("Authors endpoints", () => {
  test("GET /authors devuelve una lista", async () => {
    const res = await request(app).get("/authors")
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test("POST /authors crea un autor nuevo", async () => {
    const res = await request(app).post("/authors").send({
      name: "Autor de test",
      email: `test${Date.now()}@example.com`,
      bio: "Creado durante un test automatizado"
    })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("id")
  })

  test("GET /authors/:id devuelve 404 si no existe", async () => {
    const res = await request(app).get("/authors/999999")
    expect(res.status).toBe(404)
  })

  test("POST /authors sin email devuelve 400", async () => {
    const res = await request(app).post("/authors").send({ name: "Sin email" })
    expect(res.status).toBe(400)
  })
})