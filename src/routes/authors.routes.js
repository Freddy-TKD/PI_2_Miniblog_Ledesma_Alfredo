import { Router } from "express"
import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from "../services/authors.service.js"

const router = Router()

router.get("/", async (req, res) => {
  const authors = await getAllAuthors()
  res.json(authors)
})

router.get("/:id", async (req, res) => {
  const author = await getAuthorById(req.params.id)
  res.json(author)
})

router.post("/", async (req, res) => {
  const { name, email, bio } = req.body
  const newAuthor = await createAuthor(name, email, bio)
  res.status(201).json(newAuthor)
})

router.put("/:id", async (req, res) => {
  const { name, email, bio } = req.body
  const updated = await updateAuthor(req.params.id, name, email, bio)
  res.json(updated)
})

router.delete("/:id", async (req, res) => {
  await deleteAuthor(req.params.id)
  res.status(204).send()
})

export default router