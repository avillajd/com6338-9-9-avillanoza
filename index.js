//capture ref to important DOM elements
const weatherContainer = document.getElementById('weather')
const formEl = document.querySelector('form')
const inputEl = document.querySelector('input')

formEl.onsubmit = function (e) {
    // prevent the page from refreshing
    e.preventDefault()

    //Capture user's input from form field
    const userInput = inputEl.value.trim()

    //Abort API call if the user enters no value
    if(!userInput) return

    //call the API and then update page
    getWeather(userInput)
        .then(displayWeatherInfo)
        .catch(displayLocNotFound)

    // reset form field to a blank state
    inputEl.value = ""
}

//Calls the OpenWeather API and return object of wether info
function getWeather(query){
    //default for US
    if(!query.includes(",")) query += ',us'

    //return the fetch call which returns a promise
    //allows us to call .then on this function
    return fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&APPID=d516de008d281295fa4ddf339f86b8a0'
    )
    .then(function(res){
        return res.json()
    })
    .then (function(data){
        // location is not found, throw error/reject promise
        if(data.cod === "404")throw new Error('location not found')

        //create weather icon
        const iconUrl = 'https://openweathermap.org/img/wn/' + 
        data.weather[0].icon +
        '@2x.png'

        const description = data.weather[0].description
        const actualTemp = data.main.temp
        const feelsLikeTemp = data.main.feels_like
        const place = data.name + ", " + data.sys.country

        //create JS date object from unix timestamp
        const updatedAt = new Date(data.dt *1000)

        //this object is used by displayWeatherInfro to update the HTML
        return{
            coords: data.coord.lat + "," + data.coord.lon,
            description : description,
            iconUrl : iconUrl,
            actualTemp: actualTemp,
            feelsLikeTemp: feelsLikeTemp,
            place: place,
            updatedAt: updatedAt
        }

    })
}

// Show error message when location isnt found
function displayLocNotFound(){
    //clear any previous weather info
    weatherContainer.innerHTML = "";

    //create a H2, add error message, and add to page
    const errMsg = document.createElement('h2')
    errMsg.textContent = "Location not found"
    weatherContainer.appendChild(errMsg)
}

//update Html to display weather info
function displayWeatherInfo(weatherObj){
    //clears any previous weather info
    weatherContainer.innerHTML = "";

    //inserting line break to weather section tag
    function addBreak(){
        weatherContainer.appendChild(
            document.createElement('br')
        )
    }

    //Weather location element
    const placeName= document.createElement('h2')
    placeName.textContent = weatherObj.place
    weatherContainer.appendChild(placeName)

    //Link element for location
    const whereLink = document.createElement('a')
    whereLink.textContent = "Click to view map"
    whereLink.href = "https://www.google.com/maps/search/?api=1&query=" + weatherObj.coords
    whereLink.target = "_BLANK"
    weatherContainer.appendChild(whereLink)

    //weatherIcon image
    const icon = document.createElement('img')
    icon.src = weatherObj.iconUrl
    weatherContainer.appendChild(icon)

    //weather description
    const description = document.createElement('p')
    description.textContent = weatherObj.description
    description.style.textTransform = 'capitalize'
    weatherContainer.appendChild(description)

    addBreak()

    //currentTemp
    const temp = document.createElement('p')
    temp.textContent = "Current: " + 
    weatherObj.actualTemp +
    "℉"
    weatherContainer.appendChild(temp)

    //feels like temperature
    const feelsLikeTemp = document.createElement('p')
    feelsLikeTemp.textContent = "Feels Like: " + 
    weatherObj.feelsLikeTemp + 
    "℉"
    weatherContainer.appendChild(feelsLikeTemp)

    addBreak()

    // time updated
    const updatedAt = document.createElement('p')
    updatedAt.textContent = "Last updated: " +
    weatherObj.updatedAt.toLocaleTimeString (
        'en-US',
        {
            hour: 'numeric', 
            minute: '2-digit'
        }
    )
    weatherContainer.appendChild(updatedAt)
}

