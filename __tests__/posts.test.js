import { describe, test, expect } from "vitest"
import request from "supertest"
import app from "../src/app.js"

describe("Posts endpoints", () => {
  test("GET /posts devuelve una lista", async () => {
    const res = await request(app).get("/posts")
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test("POST /posts crea un post nuevo", async () => {
    const res = await request(app).post("/posts").send({
      title: "Post de test",
      content: "Contenido de prueba",
      author_id: 1
    })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("id")
  })

  test("DELETE /posts/:id de un recurso inexistente devuelve 404", async () => {
    const res = await request(app).delete("/posts/999999")
    expect(res.status).toBe(404)
  })
})