import { getAllPosts, getPostById, getPostsByAuthor, createPost, updatePost, deletePost } from "../services/posts.service.js"
import { getAuthorById } from "../services/authors.service.js"

export const listPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    next(error)
  }
}

export const getPostsFromAuthor = async (req, res, next) => {
  try {
    const authorId = Number(req.params.authorId)
    const author = await getAuthorById(authorId)
    if (!author) {
      return res.status(404).json({ error: "Autor no encontrado" })
    }
    const posts = await getPostsByAuthor(authorId)
    res.json({ author, posts })
  } catch (error) {
    next(error)
  }
}

export const getPost = async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" })
    }
    res.json(post)
  } catch (error) {
    next(error)
  }
}

export const addPost = async (req, res, next) => {
  try {
    const { title, content, author_id } = req.body
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: "Faltan datos obligatorios: title, content y author_id" })
    }
    const newPost = await createPost(title, content, author_id)
    res.status(201).json(newPost)
  } catch (error) {
    next(error)
  }
}

export const editPost = async (req, res, next) => {
  try {
    const { title, content, author_id } = req.body
    const updated = await updatePost(req.params.id, title, content, author_id)
    if (!updated) {
      return res.status(404).json({ error: "Post no encontrado" })
    }
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const removePost = async (req, res, next) => {
  try {
    const deleted = await deletePost(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: "Post no encontrado" })
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}