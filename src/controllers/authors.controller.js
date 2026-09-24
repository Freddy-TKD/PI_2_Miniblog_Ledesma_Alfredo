import { getAllAuthors, getAuthorById, getAuthorByEmail, createAuthor, updateAuthor, deleteAuthor } from "../services/authors.service.js"

export const listAuthors = async (req, res, next) => {
  try {
    const authors = await getAllAuthors()
    res.json(authors)
  } catch (error) {
    next(error)
  }
}

export const getAuthor = async (req, res, next) => {
  try {
    const author = await getAuthorById(req.params.id)
    if (!author) {
      return res.status(404).json({ error: "Autor no encontrado" })
    }
    res.json(author)
  } catch (error) {
    next(error)
  }
}

export const addAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body
    if (!name || !email) {
      return res.status(400).json({ error: "Faltan datos obligatorios: name y email" })
    }
    const existingAuthor = await getAuthorByEmail(email)
    if (existingAuthor) {
      return res.status(400).json({ error: "Ese email ya está en uso" })
    }
    const newAuthor = await createAuthor(name, email, bio)
    res.status(201).json(newAuthor)
  } catch (error) {
    next(error)
  }
}

export const editAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body
    const existingAuthor = await getAuthorByEmail(email)
    if (existingAuthor && existingAuthor.id !== Number(req.params.id)) {
      return res.status(400).json({ error: "Ese email ya está en uso" })
    }
    const updated = await updateAuthor(req.params.id, name, email, bio)
    if (!updated) {
      return res.status(404).json({ error: "Autor no encontrado" })
    }
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const removeAuthor = async (req, res, next) => {
  try {
    const deleted = await deleteAuthor(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: "Autor no encontrado" })
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}