import { getAuthorById } from "./services/authors.service.js"
import authorsRouter from "./routes/authors.routes.js"
import express from "express"
const app = express()

app.use(express.json())


let posts = [
  { id: 1, title: "Introducción a Node.js", content: "Node.js es un runtime de JavaScript...", author_id: 1, published: true },
  { id: 2, title: "APIs RESTful", content: "REST es un estilo arquitectónico...", author_id: 1, published: true },
  { id: 3, title: "PostgreSQL vs MySQL", content: "Ambas bases de datos tienen ventajas...", author_id: 2, published: false },
]

app.use("/authors", authorsRouter)

app.get("/posts", (req, res) => {
  res.json(posts)
})

app.get("/posts/author/:authorId", async (req, res) => {
  const authorId = Number(req.params.authorId)
  const author = await getAuthorById(authorId)
  const authorPosts = posts.filter((p) => p.author_id === authorId)
  res.json({ author, posts: authorPosts })
})

app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id)
  const post = posts.find((p) => p.id === id)
  res.json(post)
})

app.post("/posts", (req, res) => {
  const newPosts = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author_id: req.body.author_id,
    published: false
  }
  posts.push(newPosts)
  res.status(201).json(newPosts)
})

app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id)
  const post = posts.find((p) => p.id === id)

  post.title = req.body.title,
  post.content = req.body.content,
  post.author_id = req.body.author_id,

  res.json(post)
})

app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id)
  posts = posts.filter((p) => p.id !== id)
  res.status(204).send()
})


//////////////

app.get("/", (req, res) => {
  res.json({ message: "MiniBlog API funcionando" })
})

export default app
