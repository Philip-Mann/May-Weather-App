const dataKey = { 
  key: "61cf3cec929d0aa862f5acfcf1df83c8",
  base: "https://api.openweathermap.org/data/2.5/"
};


const searchSubmit = document.getElementById("submit-button");
searchSubmit.addEventListener('click', function(e){
  e.preventDefault();
  console.log(e.target);
  let searchString = document.getElementById("search-bar").value; //captures the value in the search bar
  console.log(searchString);
  getOpenWeatherResults(searchString);
});


function getOpenWeatherResults(searchString){ // this function will make the request from the open weather API
  let url =`${dataKey.base}weather?q=${searchString}&units=imperial&APPID=${dataKey.key}`;
  axios.get(url).then(res =>{
    console.log(res);
    const weather = res.data;
    const location = weather.name // made variables to grab data from my API response
    const current = weather.main.temp
    const feelsLike = weather.main.feels_like
    const high = weather.main.temp_max
    const low = weather.main.temp_min
    let description = [];
    if (weather && weather.weather && weather.weather && weather.weather.length > 0) {
      description = weather.weather.map(item => {
        return item.description
      })
    }
    renderWeatherData("widget", location, current, feelsLike, high, low, description) //function to use data from API response in my render

  })
  .catch(err =>{
    console.log("the program errored");
    console.log(err);
  })
}


const renderWeatherData = (widget, location, current, feelsLike, high, low, description) => {    //Function that renders the data
  const target = document.getElementById(widget);
  // console.log(description);
  target.innerHTML = `
    <div id="widget" class="widget">
      <div id="location" class="location"><h1>${location}</h1></div>
      <div id="current" class="current"><h2>Current: ${Math.round(current)}°f</h2></div>
      <div id="feels-like" class="feels-like"><h4>Feels Like: ${Math.round(feelsLike)}°f</h4></div>
      <div id="high" class="high"><h4>High: ${Math.round(high)}°f</h4></div>
      <div id="low" class="low"><h4>Low: ${Math.round(low)}°f</h4></div>
      <div id="description" class="description">${description}</div>
    </div>
  `;
}



