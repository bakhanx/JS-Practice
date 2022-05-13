const API_KEY = 'a048e4183ee92060a7cbe018fc34cd79';
let OnGeoSuccess = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    console.log("You live in", lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child")
            const city = document.querySelector("#weather span:last-child")
            city.innerHTML = data.name;
            weather.innerHTML = `${data.weather[0].main} / ${data.main.temp}°C / `;
        });
}
let OnGeoError = () => {
    alert("Can't find you. No weather for you")
}

navigator.geolocation.getCurrentPosition(OnGeoSuccess, OnGeoError);




