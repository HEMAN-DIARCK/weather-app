const api = {
    key : "1e200f0a1e13a8e89ba89622b56e79fc",
    base : "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.seachbox')

searchbox.addEventListener('keypress', setquary)

function setquary(evt){
    if (evt.keyCode == 13){
        getResults (searchbox.value)
        console.log(searchbox.value)
    }
}

function getResults(query) {
    fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let currently = new Date()
    let date = document.querySelector('.location .date')
    date.innerText = dateCreater(currently)

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weather_El = document.querySelector('.current .weather')
    weather_El.innerText = weather.weather[0].main

    let high_low = document.querySelector('.hi-low')
    high_low.innerText = `${Math.round(weather.main.temp_min)}°C/${Math.round(weather.main.temp_max)}°C`
}

function dateCreater(d) {
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ]
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday",
     "Friday", "Saturday", ]

     let day = days[d.getDay()]
     let date = d.getDate()
     let month = months[d.getMonth()]
     let year = d.getFullYear()

     return `${day}, ${date}, ${month}, ${year}`
}

