// const api = {
//     base: "https://api.openweathermap.org/data/2.5/",
//     key: "61cf3cec929d0aa862f5acfcf1df83c8"
// }

// const submit = document.getElementById('form');
// submit.addEventListener('submit', 

document.addEventListener('DOMContentLoaded', function () {



    function stringifyFormData(fd) {
        const data = {
            search: fd.get('submit')
        };
        return JSON.stringify(data, null, 1);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const stringified = stringifyFormData(data);
        console.log(stringified);
    };

    const form = document.getElementById('form');
    form.addEventListener('submit', handleSubmit);

})

// api.openweathermap.org/data/2.5/weather?q=Houston&APPID=61cf3cec929d0aa862f5acfcf1df83c8&units=imperial
// fetch('api.openweathermap.org/data/2.5/weather?q=') //Fetching URL
//   .then(response => response.json())
//   .then(data => console.log(data));

// // function stringifySearchData(fd) {
// //     const data = {
// //         search: fd.get('search')
// //     };
// //     return JSON.stringify(data, null, 4);
// // }

// const handleSubmit = e => {
//     e.preventDefault();
//     const data = new FormData(e.target);
//     const stringified = stringifyFormData(data);
//     console.log(stringified);
// }

// const form = document.getElementById('form');
// form.addEventListener('submit', handleSubmit);