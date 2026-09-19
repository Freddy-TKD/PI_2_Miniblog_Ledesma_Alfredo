import { Router } from "express"
import { getAllPosts, getPostById, getPostsByAuthor, createPost, updatePost, deletePost } from "../services/posts.service.js"
import { getAuthorById } from "../services/authors.service.js"

const router = Router()

router.get("/", async (req, res) => {
  const posts = await getAllPosts()
  res.json(posts)
})

router.get("/author/:authorId", async (req, res) => {
  const authorId = Number(req.params.authorId)
  const author = await getAuthorById(authorId)
  if (!author) {
    return res.status(404).json({ error: "Autor no encontrado" })
  }
  const posts = await getPostsByAuthor(authorId)
  res.json({ author, posts })
})

router.get("/:id", async (req, res) => {
  const post = await getPostById(req.params.id)
  if (!post) {
    return res.status(404).json({ error: "Post no encontrado" })
  }
  res.json(post)
})

router.post("/", async (req, res) => {
  const { title, content, author_id } = req.body
  if (!title || !content || !author_id) {
    return res.status(400).json({ error: "Faltan datos obligatorios: title, content y author_id" })
  }
  const newPost = await createPost(title, content, author_id)
  res.status(201).json(newPost)
})

router.put("/:id", async (req, res) => {
  const { title, content, author_id } = req.body
  const updated = await updatePost(req.params.id, title, content, author_id)
  if (!updated) {
    return res.status(404).json({ error: "Post no encontrado" })
  }
  res.json(updated)
})

router.delete("/:id", async (req, res) => {
  const deleted = await deletePost(req.params.id)
  if (!deleted) {
    return res.status(404).json({ error: "Post no encontrado" })
  }
  res.status(204).send()
})

export default router