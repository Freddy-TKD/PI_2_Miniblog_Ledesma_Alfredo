const errorHandler = (err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: "Algo salió mal en el servidor" })
}

export default errorHandler