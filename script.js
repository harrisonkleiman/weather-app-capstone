//Get all necessary elements from the DOM
const app = document.querySelector(".weather-app")
const temp = document.querySelector(".temp")
const displayDate = document.querySelector(".date")
const displayTime = document.querySelector(".time")
const conditionDisplay = document.querySelector(".condition")
const displayName = document.querySelector(".name")
const icon = document.querySelector(".icon")
const displayCloudCover = document.querySelector(".cloud")
const displayHumidity = document.querySelector(".humidity")
const displayWind = document.querySelector(".wind")
const sideBar = document.getElementById("locationInput")
const search = document.querySelector(".search")
const cities = document.querySelectorAll(".city")

//Initial city is your location
let cityInput = "Buffalo"

//Add click event to each city in search bar and btn
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML
    getWeather()
  })
  app.style.opacity = "0"
})

//Add search event handler to the search button
sideBar.addEventListener("submit", (e) => {
  // error throw for search input
  if (search.value.length == 0) {
    alert("Hmm... cannot seem to find that city")
  } else {
    // CITY name change when searched
    cityInput = search.value

    getWeather()
    search.value = ""
    app.style.opacity = "0"
  }

  // PREVENTS PAGE FROM REFRESHING
  e.preventDefault()
})

// RETURNS WEEKDAY DYNAMICALLY
function dayOfTheWeek(month, day, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  return weekday[new Date(`${month}/${day}/${year}`).getDay()]
}

// MAIN FUNCTION
function getWeather() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=e0c1a083d9094ababd0211848210510&q=${cityInput}&units=imperial`
  )
    // CONVERT DATA FROM JSON --> JS OBJECT
    .then((res) => res.json())
    .then((data) => {
      // Adding the temperature & weather-condition to main container
      temp.innerHTML = Math.round(data.current.temp_f) + "°F"
      conditionDisplay.innerHTML = data.current.condition.text

      // UPDATE DATE AND TIME FROM API
      const date = data.location.localtime
      const year = date.slice(0, 4)
      const month = date.slice(5, 7)
      const day = date.slice(8, 10)
      //get time from the API and convert to 12 hour format
      let time = data.location.localtime
      let hours = time.slice(11, 13)
      let minutes = time.slice(11, 16)
      let ampm = hours >= 12 ? "PM" : "AM"
      time = `${minutes} ${ampm}`

      displayDate.innerHTML = `${dayOfTheWeek(
        month,
        day,
        year
      )} ${month}/${day}/${year}`

      // TIME
      displayTime.innerHTML = time

      displayName.innerHTML = data.location.name

      // ACCURATE ICONS
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      )

      icon.src = "./icons/" + iconId

      // ADD SIDE-BAR DATA
      displayCloudCover.innerHTML = Math.round(data.current.cloud) + "%"
      displayHumidity.innerHTML = Math.round(data.current.humidity) + "%"
      displayWind.innerHTML = Math.round(data.current.wind_mph) + " mph"

      app.style.opacity = "1"
    })
}
//Call the function on page load
getWeather()


