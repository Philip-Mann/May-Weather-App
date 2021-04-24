const newsApiKey = {
  key: "271c952b09b541eb9c278ed7ed1ecdbb",
  base: "https://newsapi.org/v2/everything/"
}

const newsSearchSubmit = document.getElementById("submit-button");
newsSearchSubmit.addEventListener('click', e => {
  e.preventDefault();
  console.log(e.target);
  let newsSearchString = document.getElementById("search-bar").value; //captures the value in the search bar
  console.log(newsSearchString);
  getNewsApiResults(newsSearchString);
});

function getNewsApiResults(newsSearchString) { // this function will make the request from the news API
  let url = `${newsApiKey.base}?q=${newsSearchString}&apiKey=${newsApiKey.key}&pageSize=5`;
  axios.get(url).then(res => {
    console.log(res);
  })
    .catch(err => {
      console.log("the program errored");
      console.log(err);
    })
}