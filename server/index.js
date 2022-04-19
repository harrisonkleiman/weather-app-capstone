// NODE/EXPRESS SERVER SETUP
const express = require("express")

const server = express()

const PORT = 5000

server.get("/index.html", (req, res) => {
  res.json({ message: "Hello World" })
})

const locationsSearched = []

server.post("./api/index.html", (req, res) => {
  const { city } = req.body
  locationsSearched.push(city)

  res.json({ locationsSearched })

  // console.log(locationsSearched)
})


server.listen(5000, () => {
  console.log(`Server is rocking on http://localhost:${PORT}`)
})

