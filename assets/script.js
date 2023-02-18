var apiKey  = "e03b14a13a81827b9aeafad59274a1cc"

var searchHistory = []


//loading search history




/*
1. first get the element
2. add to that element


*/
function load(){

    if(localStorage.getItem("searchHistory") !== null){
        var mySearchHistory = JSON.parse( localStorage.getItem("searchHistory") ) //returns an array

        searchHistory = mySearchHistory; //add city ies in local storage
        var savedCityEl = document.querySelector("#searchHistory");
        savedCityEl.innerHTML = "";
    
        if(searchHistory != null){
            
            searchHistory.forEach(city => {
                console.log("i got element", city)
                var buttonEl = document.createElement("button"); //create a button <button></button>
                buttonEl.textContent = city //add text inside
                buttonEl.addEventListener("click", function() {
                    console.log("???")
                    getCoords(city)
                })
                savedCityEl.appendChild(buttonEl);
               
            
            });
    
    
    
        }



    } else {
        searchHistory = [];
    }
   
   


}
load();




function getCoords(city) {

    //saving search
    searchHistory.push(document.querySelector("#search-input").value)
    localStorage.setItem("searchHistory",JSON.stringify(searchHistory) );

    load();



    //search
    //var searchCity = document.querySelector("#search-input").value;
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

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

            // added

            

           
        })

} 









document.querySelector("#search-btn").addEventListener("click", function(){

    var searchCity = document.querySelector("#search-input").value;


    getCoords(searchCity)
});



