const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#errorMessage');
const messageTwo = document.querySelector('#weatherData');

const formClick = function (e) {
    e.preventDefault();
    getWeather(search.value);
}

const getWeather = (address) => {
    messageOne.textContent = '';
    messageTwo.textContent = 'Loading';

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            }else{
                messageTwo.textContent = data.forecast + " " + data.name;
            }
        })
    });
}

form.addEventListener('submit', formClick);

