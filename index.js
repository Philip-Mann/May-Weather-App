var globalIconCode
document.addEventListener("DOMContentLoaded", function(){
  const main = document.getElementById("weather-widget");
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

const dataKey = {   //created a array that contains the OpenWeathe API key and base URL
  key: "61cf3cec929d0aa862f5acfcf1df83c8",
  base: "https://api.openweathermap.org/data/2.5/"
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
    url =`${dataKey.base}weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${dataKey.key}`;
  }
  else{
    url =`${dataKey.base}weather?q=${searchString}&units=imperial&APPID=${dataKey.key}`;
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
    globalIconCode = iconCode;
    togglePageStyle(globalIconCode);
    console.log(globalIconCode);
    renderWeatherData("weather-widget", location, country, current, feelsLike, high, low, iconCode, iconUrl, description) //function to use data from API response in my render
  })
  .catch(err =>{
    console.log("the program errored");
    // alert('Try again you donut!')
    console.log(err);
  })
}

const renderWeatherData = (widget, location, country, current, feelsLike, high, low, iconCode, iconUrl, description) => {    //Function that renders the data
  const target = document.getElementById(widget);
  // console.log(description);
  target.innerHTML = `

  <div class="card mb-3 w-disp">
    <div class="row g-0 special-card">
      <div class="col-md-8">
        <div class="card-body align-items-center d-flex justify-content-center">
          <div class="card-body" style="position: relative">
            <h4 class="card-title">${location}, ${country}</h4>
            <p class="card-text">
              <h5 class="current-weather">${Math.round(current)}°F</h5>
              <p class="high-low">${Math.round(high)}/${Math.round(low)}°F</p>
              <p class="feels-like">Feels Like: ${Math.round(feelsLike)}°F</p>
              <p class="description">${description}</p>
            </p>
            <p style="position: absolute; right:-80px; top:130px;"> <img class="icon" style=" height:100px; width:100px;" src="${iconUrl}${iconCode}.png" alt="${description}"/></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function togglePageStyle(globalIconCode) {
  let allCodes = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "10d", "11d", "13d", "50d"]
  //d for day n for night ------ 01 Clear    02 Few    03 Scattered    04 Broken    09 Shower    10 Rain    11 Thunderstorm    13 Snow    50 Mist/Fog
  if(globalIconCode == allCodes[0]) {
    document.body.style.backgroundImage = "url('./images/Clear-D.jpg')";
  }
  else if (globalIconCode == allCodes[1]) {
    document.body.style.backgroundImage = "url('./images/Clear-N.jpg')";
  }
  else if (globalIconCode == allCodes[2]) {
    document.body.style.backgroundImage = "url('./images/Few-D.jpg')";
  }
  else if (globalIconCode == allCodes[3]) {
    document.body.style.backgroundImage = "url('./images/Few-N.jpg')";
  }
  else if (globalIconCode == allCodes[4]) {
    document.body.style.backgroundImage = "url('./images/Scattered-D.jpg')";
  }
  else if (globalIconCode == allCodes[5]) {
    document.body.style.backgroundImage = "url('./images/Scattered-N.jpg')";
  }
  else if (globalIconCode == allCodes[6]) {
    document.body.style.backgroundImage = "url('./images/Broken-D.jpg')";
  }
  else if (globalIconCode == allCodes[7]) {
    document.body.style.backgroundImage = "url('./images/Broken-N.jpg')";
  }
  else if (globalIconCode == allCodes[8]) {
    document.body.style.backgroundImage = "url('./images/Shower.jpg')";
  }
  else if (globalIconCode == allCodes[9]) {
    document.body.style.backgroundImage = "url('./images/Rain.jpg')";
  }
  else if (globalIconCode == allCodes[10]) {
    document.body.style.backgroundImage = "url('./images/Thunderstorm.jpg')";
  }
  else if (globalIconCode == allCodes[11]) {
    document.body.style.backgroundImage = "url('./images/Snow.jpg')";
  }
  else if (globalIconCode == allCodes[12]) {
    document.body.style.backgroundImage = "url('./images/Mist.jpg')";
  }}