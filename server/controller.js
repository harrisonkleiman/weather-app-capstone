const cities = require("db.json")
let globalID = 0

// accessing cities from script.js
module.exports = {
  getCity: (req, res) => {
    const city = req.query.city
    const cityData = cities.filter((city) => city.name === city)
    res.status(200).send(cityData)
  },

  addCity: (req, res) => {
    const city = req.query.city
    const cityData = cities.filter((city) => city.name === city)
    res.status(200).send(cityData)
  },
}
