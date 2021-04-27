const dataKey = {   //created a array that contains the OpenWeathe API key and base URL
  key: "61cf3cec929d0aa862f5acfcf1df83c8",
  base: "https://api.openweathermap.org/data/2.5/"
};


const searchSubmit = document.getElementById("submit-button");    //grabs the submit button out of the DOM
searchSubmit.addEventListener('click', function(e){   //adds eventListener to DOM
  e.preventDefault();   //Keeps the browser from refreshing when clicking Search
  console.log(e.target);  //displays searchSubmit in console  
  let searchString = document.getElementById("search-bar").value; //captures the value in the search bar
  console.log(searchString);  //displays value of searchString entered into search-bar in console
  getOpenWeatherResults(searchString);
});


function getOpenWeatherResults(searchString){ // this function will make the request from the open weather API
  let url =`${dataKey.base}weather?q=${searchString}&units=imperial&APPID=${dataKey.key}`;
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
    let iconUrl = "http://openweathermap.org/img/w/";   //icon  img src Url
    let description = [];   //description ie. scattered clouds, in array and had to loop through it to grab it
    if (weather && weather.weather && weather.weather && weather.weather.length > 0) {
      description = weather.weather.map(item => {
        return item.description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));   //will capitalize the first letter of every word in a string
      })
    }
    renderWeatherData("widget", location, country, current, feelsLike, high, low, iconCode, iconUrl, description) //function to use data from API response in my render
  })
  .catch(err =>{
    console.log("the program errored");
    // alert('Try again you donut!')
    console.log(err);
  })
}


const renderWeatherData = (widget, country, location, current, feelsLike, high, low, iconCode, iconUrl, description) => {    //Function that renders the data
  const target = document.getElementById(widget);
  // console.log(description);
  target.innerHTML = `
    <div id="widget" class="widget">
      <div id="location" class="location"><h1>${country}, ${location}</h1></div>
      <div id="current" class="current"><h2>Current: ${Math.round(current)}°f</h2></div>
      <div id="feels-like" class="feels-like"><h4>Feels Like: ${Math.round(feelsLike)}°f</h4></div>
      <div id="high" class="high"><h4>High: ${Math.round(high)}°f</h4></div>
      <div id="low" class="low"><h4>Low: ${Math.round(low)}°f</h4></div>
      <div id="description" class="description">${description}<img src="${iconUrl}${iconCode}.png"/> </div>
    </div>
  `;
}

