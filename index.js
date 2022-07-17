// Your code here

// API CALL for https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const weatherDiv = document.getElementById('weather-app')
const form = document.querySelector('form')
const input= document.querySelector('input')
const weatherSection = document.getElementById ('weather')


form.onsubmit = function(e){
    e.preventDefault()
    const userQuery = input.value
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userQuery + '&APPID=d516de008d281295fa4ddf339f86b8a0'
    if (!userQuery) return
    form.search.value = ""

    fetch(URL)
    .then (function(res){
        return res.json()
    }) 
    
    .then(report)
    .catch (function(err) {
        const h2 = document.createElement('h2')
        h2.textContent = "Location Not Found"
        weatherSection.appendChild(h2)
    } )
   function report(report) {
    e.preventDefault()
    console.log(report)
    weatherSection.innerHTML = ""
    this.input.value = ""
    const br = document.createElement('br')
    const h2 = document.createElement('h2')
    h2.textContent = report.name + ', ' + report.sys.country
    weatherSection.appendChild(h2)

    const map = document.createElement('a') // link to google maps.
    const lat = report.coord.lat
    const long = report.coord.lon
    map.href = 'https://www.google.com/maps/search/?api=1&query=' + lat + "," + long
    map.target = "__BLANK"
    map.textContent = "Click to view map"
    map.classList.add('map')
    weatherSection.appendChild(map)

    //Icon
    const img = document.createElement('img')
    const weatherIcon = report.weather[0].icon
    img.src = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'
    img.classList.add('weatherIcon')
    weatherSection.appendChild(img)
    
    // Description
    const descript = document.createElement('p')
    const weatherDescript = report.weather[0].description
   
    descript.textContent = "Currently: " + weatherDescript
    descript.style.textTransform = 'capitilize'
    descript.classList.add('descript')
    weatherSection.appendChild(descript)

    const br = document.createElement('br')
    weatherSection.appendChild(br)

    //actual Temp
    const actualTemp = document.createElement('p')
    const weatherActualTemp = report.main.temp
    const realTemp = Math.floor(weatherActualTemp - 273.15)* 1.8000+ 32.00
    actualTemp.textContent = "Current: " + realTemp  + "° F" // Try this one 
    actualTemp.classList.add('actual_Temp')
    weatherSection.appendChild(actualTemp)
    console.log(realTemp)

// Feels Like Temp
    const fakeTemp = document.createElement('p')
    const weatherFeelsTemp = report.main.feels_like
    const feelsLike = Math.floor(weatherFeelsTemp - 273.15)* 1.8000+32.00
    fakeTemp.textContent = "Feels Like: " + feelsLike  + "° F"
    fakeTemp.classList.add('feels_like')
    weatherSection.appendChild(fakeTemp)

    // updated time
    const br = document.createElement('br')
    weatherSection.appendChild(br)

    const updateTime = document.createElement('p')
    const lastTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    updateTime.textContent = "Last Updated: " + lastTime
    updateTime.classList.add('lastUpdated')
    weatherSection.appendChild(updateTime)

   }
}

