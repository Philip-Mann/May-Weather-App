const newsApiKey = {
  key: "271c952b09b541eb9c278ed7ed1ecdbb",
  base: "https://newsapi.org/v2/everything/?"
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
  let url = `${newsApiKey.base}q=${newsSearchString}&apiKey=${newsApiKey.key}&pageSize=5`;
  let carousel = document.getElementById("news-carousel");
  axios.get(url).then(res => {
    console.log(res.articles);
    carousel.innerHTML =renderNews(res.articles)  // will pass data to render function from here

  })
  .catch(err => {
    console.log("the program errored");
    console.log(err);
  });
};

function renderNews(articles) {
  // function will render data to the carousel based on data passed from API call
  let printed = articles.map((item, index) => {
    if(index=0){
      return `
      <div class="carousel-item active">
        <a target="_blank" href="${item.url}"><img src="${item.urlToImage}" class="d-block w-100" alt="${item.title}" style="height: 300px; width: 100%;"></a>
      </div>
      `;
    }
    else{
      return `
      <div class="carousel-item">
      <a target="_blank" href="${item.url}"><img src="${item.urlToImage}" class="d-block w-100" alt="${item.title}" style="height: 300px; width: 100%;"></a>
      </div>
      `;  
    };
  })
return printed;
}