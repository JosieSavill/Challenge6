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

     var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

     fetch(apiUrl)
        .then(function (res) { 
            return res.json()
        })

        .then(function (data) {
           
            console.log(data)
            var currentWeather = document.querySelector(".currentWeather");
            var currentTemp = document.querySelector(".currentTemp");
            var currentHumidity = document.querySelector(".currentHumidity");
            var currentWindSpeed = document.querySelector(".currentWindSpeed");
            var dayTwoTemp = document.querySelector(".dayTwoTemp");
            var dayTwoHumidity = document.querySelector(".dayTwoHumidity");
            var dayTwoWindSpeed = document.querySelector(".dayTwoWindSpeed");
            currentTemp.textContent = "Today's Temp: "+ data.list[0].main.temp +"*F";
            currentHumidity.textContent = "Today's Humidity Index: " + data.list[0].main.humidity + " %";
            currentWindSpeed.textContent = "Today's Wind Speed Index: " + data.list[0].wind.speed;
            dayTwoTemp.textContent = "Tomorrow's Temperature: " + data.list[1].main.temp + "*F";
            dayTwoHumidity.textContent = "Tomorrow's Humidity Index: " + data.list[1].main.humidity + " %";
            dayTwoWindSpeed.textContent = "Tomorrow's Wind Index: " + data.list[1].wind.speed;

           
        })

} 







document.querySelector("#search-btn").addEventListener("click", getCoords);



