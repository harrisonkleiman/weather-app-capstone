//Get all necessary elements from the DOM
const app = document.querySelector(".weather-app")
const temp = document.querySelector(".temp")
const displayDate = document.querySelector(".date")
const displayTime = document.querySelector(".time")
const conditionDisplay = document.querySelector(".condition")
const nameOutput = document.querySelector(".name")
const icon = document.querySelector(".icon")
const displayCloudCover = document.querySelector(".cloud")
const humidityOutput = document.querySelector(".humidity")
const windOutput = document.querySelector(".wind")
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
    /*Change from default city to the 
    one written in the input field*/
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
      // adding the temperature and weather condition to main container
      temp.innerHTML = Math.round(data.current.temp_f) + "°F"
      conditionDisplay.innerHTML = data.current.condition.text

      // UPDATE DATE AND TIME
      const date = data.location.localtime // get the date from the API
      const year = date.slice(0, 4) // get the year
      const month = date.slice(5, 7)
      const day = date.slice(8, 10)
      //get time from the API and convert to 12 hour format
      const time = data.location.localtime.slice(11, 16)

      displayDate.innerHTML = `${dayOfTheWeek(
        month,
        day,
        year
      )} ${month}/${day}/${year}`

      // TIME
      displayTime.innerHTML = time

      nameOutput.innerHTML = data.location.name

      // ACCURATE ICONS
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      )

      icon.src = "./icons/" + iconId

      // ADD SIDE-BAR DATA
      displayCloudCover.innerHTML = Math.round(data.current.cloud) + "%"
      humidityOutput.innerHTML = Math.round(data.current.humidity) + "%"
      windOutput.innerHTML = Math.round(data.current.wind_mph) + " mph"

      app.style.opacity = "1"
    })
}
//Call the function on page load
getWeather()


