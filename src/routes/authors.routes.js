import { Router } from "express"
import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from "../services/authors.service.js"

const router = Router()

router.get("/", async (req, res) => {
  const authors = await getAllAuthors()
  res.json(authors)
})

router.get("/:id", async (req, res) => {
  const author = await getAuthorById(req.params.id)
  if (!author) {
    return res.status(404).json({ error: "Autor no encontrado" })
  }
  res.json(author)
})

router.post("/", async (req, res) => {
  const { name, email, bio } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: "Faltan datos obligatorios: name y email" })
  }
  const newAuthor = await createAuthor(name, email, bio)
  res.status(201).json(newAuthor)
})

router.put("/:id", async (req, res) => {
  const { name, email, bio } = req.body
  const updated = await updateAuthor(req.params.id, name, email, bio)
  if (!updated) {
    return res.status(404).json({ error: "Autor no encontrado" })
  }
  res.json(updated)
})

router.delete("/:id", async (req, res) => {
  const deleted = await deleteAuthor(req.params.id)
  if (!deleted) {
    return res.status(404).json({ error: "Autor no encontrado" })
  }
  res.status(204).send()
})

export default router