var apiKey  = "e03b14a13a81827b9aeafad59274a1cc"




function getCoords() {

    var searchCity = document.querySelector("#search-input").value;
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=${apiKey}`

    fetch(apiUrl)
        .then(function (res) { 
            return res.json()
        })

        .then(function (data) {
           console.log(data)
           console.log("lat", data[0].lat)
           var lat = data[0].lat;
           var lon = data[0].lon;
           getWeather(lat, lon); 
           
        })
}


function getWeather(lat, lon) {

     var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

     fetch(apiUrl)
        .then(function (res) { 
            return res.json()
        })

        .then(function (data) {
           
            console.log(data)
           
        })

} 







document.querySelector("#search-btn").addEventListener("click", getCoords);



