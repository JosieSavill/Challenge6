var apiKey  = "e03b14a13a81827b9aeafad59274a1cc"

var searchHistory = []

// adding 2 var for clear button on line 7 and 8

var clearEl = document.querySelector('#clear');
var textAreaEl = document.querySelector('#search-input');




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
                    getCoords(city, true)
                })
                savedCityEl.appendChild(buttonEl);
               
            
            });
    
    
    
        }



    } else {
        searchHistory = [];
    }
   
   


}
load();




function getCoords(city, button = false) {

    //saving search
    if(!button){
        searchHistory.push(document.querySelector("#search-input").value)
        localStorage.setItem("searchHistory",JSON.stringify(searchHistory) );
    }


    load();



    //search
    //var searchCity = document.querySelector("#search-input").value;
    var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

    fetch(apiUrl)
        .then(function (res) { 
            return res.json()
        })

        .then(function (data) {


           //console.log(data)
           //console.log("lat", data[0].lat)
           var lat = data[0].lat;
           var lon = data[0].lon;
           getWeather(lat, lon); 


           
        })
}


function getWeather(lat, lon) {

     var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

     fetch(apiUrl)
        .then(function (res) { 
            return res.json()
        })

        .then(function (data) {


            //current weather
         
            var currentTemp = document.querySelector(".currentTemp");
            var currentHumidity = document.querySelector(".currentHumidity");
            var currentWindSpeed = document.querySelector(".currentWindSpeed");

    
            currentTemp.textContent = "Today's Temp: "+ data.list[0].main.temp +"*F";
            currentHumidity.textContent = "Today's Humidity Index: " + data.list[0].main.humidity + " %";
            currentWindSpeed.textContent = "Today's Wind Speed Index: " + data.list[0].wind.speed;


           
            console.log("weather:",data)
            //0, 8, 16, 24,32
            let fiveDayEl = document.querySelector(".fiveDayForecast");
            fiveDayEl.innerHTML = ""; //empty before you add

            for(let i = 0; i < 5; i++){
                let day = data.list[0 + (i * 8)];
                let divEl = document.createElement("div"); //parent div


                let pElDate =  document.createElement("p"); //create p element
                pElDate.textContent = day.dt_txt; //add text to p elemet
                let pElTemp = document.createElement("p")
                pElTemp.textContent = "temp:" + day.main.temp;
                let pElWind = document.createElement("p")
                pElWind.textContent = "wind:" + day.wind.speed;
                let pElHumid = document.createElement("p");
                pElHumid.textContent = "humidity" + day.main.humidity + "%"
                let icon = document.createElement("img");
                //https://openweathermap.org/img/w/10d.png
                icon.setAttribute("src", "https://openweathermap.org/img/w/"  + day.weather[0].icon + ".png")

                icon.setAttribute("alt", day.weather[0].icon)

                divEl.appendChild(pElDate) 
                divEl.appendChild(icon)
                divEl.appendChild(pElTemp)
                divEl.appendChild(pElWind)
                divEl.appendChild(pElHumid)
           
     
             
                fiveDayEl.appendChild(divEl)



            }
            
            
           
            



           
        })

} 









document.querySelector("#search-btn").addEventListener("click", function(){

    var searchCity = document.querySelector("#search-input").value;


    getCoords(searchCity, false)
});






// added clear button method on line 209


clearEl.addEventListener('click', function (event) {
    event.preventDefault();
    textAreaEl.value = '';
  
   
  });

