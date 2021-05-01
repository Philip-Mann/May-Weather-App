const main = document.getElementById("weather-widget");
const forecast = document.getElementById("weather-carousel");
document.addEventListener("DOMContentLoaded", function(){
  // const main = document.getElementById("weather-widget");
  // const forecast = document.getElementById("weather-carousel");
  geoFindMe(main); // calls the location function as the page starts
  

  const searchSubmit = document.getElementById("submit-button");    //grabs the submit button out of the DOM
  searchSubmit.addEventListener('click', function(e){   //adds eventListener to DOM
  e.preventDefault();   //Keeps the browser from refreshing when clicking Search
  console.log(e.target);  //displays searchSubmit in console  
  let searchString = document.getElementById("search-bar").value; //captures the value in the search bar
  console.log(searchString);  //displays value of searchString entered into search-bar in console
  getOpenWeatherResults(searchString);
  });

});

const dataKey = {   //created a array that contains the OpenWeather API key and base URL
  key: "61cf3cec929d0aa862f5acfcf1df83c8",
  base: "https://api.openweathermap.org/data/2.5/weather?",
  forecast: "https://api.openweathermap.org/data/2.5/onecall?"
};


// const searchSubmit = document.getElementById("submit-button");
// searchSubmit.addEventListener('click', function(e){
//   e.preventDefault();
//   console.log(e.target);
//   let searchString = document.getElementById("search-bar").value; //captures the value in the search bar
//   console.log(searchString);
//   getOpenWeatherResults(searchString);
// });

function isCoord(searchString) {
  console.log(searchString);
  if(searchString == undefined){
    console.log("true");
    return true;
  }
  else{
    console.log("false");
    return false;
  };

};


function getOpenWeatherResults(searchString){ // this function will make the request from the open weather API
  let url; //=`${dataKey.base}weather?q=${searchString}&units=imperial&APPID=${dataKey.key}`;
  if(isCoord(searchString)){
    url =`${dataKey.base}lat=${lat}&lon=${lon}&units=imperial&APPID=${dataKey.key}`;
  }
  else{
    url =`${dataKey.base}q=${searchString}&units=imperial&APPID=${dataKey.key}`;
  };
  axios.get(url).then(res =>{
    console.log(res);   //displays weather data in console
    const weather = res.data;
    const location = weather.name // made variables to grab data from my API response
    const country = weather.sys.country
    const current = weather.main.temp   //gets current weather
    const feelsLike = weather.main.feels_like   //gets feels like temp  
    const high = weather.main.temp_max    //gets daily high
    const low = weather.main.temp_min   //gets daily low
    let iconCode = weather.weather[0].icon    //gets icon code
    let iconUrl = "https://openweathermap.org/img/w/";   //icon  img src Url
    let description = [];   //description ie. scattered clouds, in array and had to loop through it to grab it
    if (weather && weather.weather && weather.weather && weather.weather.length > 0) {
      description = weather.weather.map(item => {
        return item.description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));   //will capitalize the first letter of every word in a string
      });
    }
    lon = weather.coord.lon; //global variable defined in location.js
    lat = weather.coord.lat; //global variable defined in location.js
    //function call to get forecast data
    getForecastResults(lon, lat);
    //=========Forecast===============
    renderWeatherData("weather-widget", location, country, current, feelsLike, high, low, iconCode, iconUrl, description) //function to use data from API response in my render
  })
  .catch(err =>{
    console.log("the current weather program errored");
    console.log(err);
  })
}

function getForecastResults(longitude, latitude){
  let url= `${dataKey.forecast}lat=${latitude}&lon=${longitude}&units=imperial&APPID=${dataKey.key}`; // makes call to get data from API for future forecast

  axios.get(url).then(res =>{ //api call for 7 day forecast data
    // console.log(res.data.daily); //this is the directory for daily data that we are looking for
    const daily = res.data.daily;
    forecast.innerHTML = renderDailyForecast(daily); // sets the inner html of the carousel to the render which passes the data path above
  })
  .catch(err=>{
    console.log("the forecast weather program errored");
    console.log(err);
  })
};


function renderWeatherData(widget, location, country, current, feelsLike, high, low, iconCode, iconUrl, description) {    //Function that renders the data
  const target = document.getElementById(widget);
  // console.log(description);
  target.innerHTML = `

  <div class="card mb-3 w-disp">
    <div class="row g-0">
      <div class="col-md-8">
        <div class="card-body">
          <h4 class="card-title">${location}, ${country}</h4>
          <p class="card-text">
            <h5 class="current-weather">${Math.round(current)}°F<img src="${iconUrl}${iconCode}.png" alt="${description}" /></h5>
            <p class="high-low">${Math.round(high)}/${Math.round(low)}°F</p>
            <p class="feels-like">Feels Like: ${Math.round(feelsLike)}°F</p>
            <p class="description">${description}</p>
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
};

function renderDailyForecast(daily){ //renders the forecast into casrds on a carousel
  console.log("we are in the render function");
  let printed = daily.map((item, index) =>{
    if(index==0){ //specifies the first active item on the carousel
      return `
      <div class="carousel-item active">
        <div class="card mb-3 w-disp">
            <div class="card-body">
              <h5 class="card-title">${moment(item.dt*1000).format("MMM DD")}</h5>
              <p class="card-text">${Math.round(item.temp.day)}°F</p><img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}" />
              <p class="high-low">${Math.round(item.temp.max)}/${Math.round(item.temp.min)}°F</p>
              <p class="description">${item.weather[0].description}</p>
            </div>
        </div>
      </div>
      `;
    }
    else{ // all remaining items rendered afterward in here (difference seen on first div class name)
      return `
      <div class="carousel-item">
        <div class="card mb-3 w-disp">
          <div class="card-body">
            <h5 class="card-title">${moment(item.dt*1000).format("MMM DD")}</h5>
            <p class="card-text">${Math.round(item.temp.day)}°F</p><img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}" />
            <p class="high-low">${Math.round(item.temp.max)}/${Math.round(item.temp.min)}°F</p>
            <p class="description">${item.weather[0].description}</p>
          </div>
        </div>
      </div>
      `;  
    };
  })
  return printed.join("");
};