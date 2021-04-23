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
  })
  .catch(err =>{
    console.log("the program errored");
    console.log(err);
  })
}