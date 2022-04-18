// NODE/EXPRESS SERVER SETUP
const express = require("express")

const server = express()

const PORT = 5000

server.get("/index.html", (req, res) => {
  res.json({ message: "Hello World" })
})

server.listen(5000, () => {
  console.log(`Server is rocking on http://localhost:${PORT}`)
})

