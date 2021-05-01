// GEO Find Me Function - gets users data should they agree to share
var lon; // global variable for longitude
var lat; // global variable for latitude 

function geoFindMe(main) {

  // const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    lat= latitude;
    lon= longitude;
    // status.textContent = '';
    // mapLink.href = `https://www.openstreetmap.org/#map=10/${latitude}/${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    main.innerHTML = getOpenWeatherResults();
  }

  function error() {
    // status.textContent = 'Unable to retrieve your location';
    main.innerHTML = getOpenWeatherResults("Washington");
  }

  if(!navigator.geolocation) {
    // status.textContent = 'Geolocation is not supported by your browser';
  } else {
    // status.textContent = 'Locating…';
    return navigator.geolocation.getCurrentPosition(success, error);
  }

}

// document.querySelector('#find-me').addEventListener('click', geoFindMe);