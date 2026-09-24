import swaggerUi from "swagger-ui-express"
import { readFileSync } from "fs"
import authorsRouter from "./routes/authors.routes.js"
import postsRouter from "./routes/posts.routes.js"
import errorHandler from "./middlewares/errorHandler.js"
import express from "express"
const app = express()

app.use(express.json())

app.use("/authors", authorsRouter)
app.use("/posts", postsRouter)
const openapiSpec = JSON.parse(readFileSync(new URL("../openapi.json", import.meta.url)))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec))

app.get("/", (req, res) => {
  res.json({ message: "MiniBlog API funcionando" })
})

app.use(errorHandler)

export default app