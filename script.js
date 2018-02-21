/* 
 * Get the weather info and display it on the page
 */
function getWeather() {
    let zip = document.getElementsByName("zip")[0].value;
    let url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=d8ac38bdc31711ea419ce14f266a7082&units=imperial";
    let icon = "";

    $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&%20sensor=false", function(a) {
        let latitude = a.results[0].geometry.location.lat;
        let longitude = a.results[0].geometry.location.lng;
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude, function(a) {
            if (a.weather[0].icon != null) {
                let icon = a.weather[0].icon;
                document.getElementById("icon").innerHTML = 
                    "<img src='" + icon + "' height='200px' width='200px'>";
            }
            console.log(a.weather[0].id)
            if (a.weather[0].id === 802 || a.weather[0].id === 804) {
                document.getElementsByTagName('body')[0].style.background = 'linear-gradient(#252839, grey)';
            } else {
                document.getElementsByTagName('body')[0].style.backgroundColor = '#252839';
            }
    });
    });
    $.getJSON(url, function(a) {
        document.getElementById("weather").innerHTML = 
            "<h2>" + a.name.toUpperCase() + "</h2>" +
            "<h2>" + Math.floor(a.main.temp) + "&deg;</h2>" +
            "<h2>Max: " + Math.floor(a.main.temp_max) + "&deg;</h2>" +
            "<h2>Min: " + Math.floor(a.main.temp_min) + "&deg;</h2>" +
            "<h1 style='color: #f2b632'>" + a.weather[0].description.toUpperCase() + "</h2>";  
    });
 
    document.getElementsByName("zip")[0].value = "";
}



