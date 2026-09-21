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

  test("POST /authors con email repetido devuelve 400", async () => {
    const email = `repetido${Date.now()}@example.com`
    await request(app).post("/authors").send({
      name: "Autor original",
      email,
      bio: "El primero con este email"
    })
    const res = await request(app).post("/authors").send({
      name: "Autor duplicado",
      email,
      bio: "Intenta usar el mismo email"
    })
    expect(res.status).toBe(400)
  })

  test("PUT /authors/:id actualiza un autor existente", async () => {
    const created = await request(app).post("/authors").send({
      name: "Autor para actualizar",
      email: `actualizar${Date.now()}@example.com`,
      bio: "Bio original"
    })
    const res = await request(app).put(`/authors/${created.body.id}`).send({
      name: "Autor actualizado",
      email: created.body.email,
      bio: "Bio actualizada"
    })
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Autor actualizado")
  })

  test("DELETE /authors/:id borra un autor existente", async () => {
    const created = await request(app).post("/authors").send({
      name: "Autor para borrar",
      email: `borrar${Date.now()}@example.com`,
      bio: "Se va a borrar"
    })
    const res = await request(app).delete(`/authors/${created.body.id}`)
    expect(res.status).toBe(204)
  })
})