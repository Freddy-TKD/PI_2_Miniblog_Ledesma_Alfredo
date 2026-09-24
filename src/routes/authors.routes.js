import { Router } from "express"
import { listAuthors, getAuthor, addAuthor, editAuthor, removeAuthor } from "../controllers/authors.controller.js"

const router = Router()

router.get("/", listAuthors)
router.get("/:id", getAuthor)
router.post("/", addAuthor)
router.put("/:id", editAuthor)
router.delete("/:id", removeAuthor)

export default router