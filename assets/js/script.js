// Save API key and other components of the queryURL
const apiKey = "&appid=b3bd4c3e267e6dafcf4c60c628a712e3";
const baseURL = "https://api.openweathermap.org/data/2.5/forecast?";
const units = "&units=metric"

function buildQueryURL(baseURL, city, apiKey, units) {
  return baseURL + city + apiKey + units;
}


$('#search-form').on("submit", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the search box
    let city = "q="+ $('#search-input').val();
    // let lat = "lat="
    // let long = "&lon="
    let queryURL = buildQueryURL(baseURL, city, apiKey, units);
    // Created an AJAX call
    $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  
    // Create CODE HERE to Log the queryURL
    console.log((queryURL));
    // Create CODE HERE to log the resulting object
    console.log(response);
    // Code to get the temperature
    let tempC = parseFloat(response.list[0].main.temp) 
    // console.log(tempC);

    // Create elements to add content to HTML
    
    const date = moment().format("DD/MM/YYYY");
    // console.log(date);

    const cityEl = $('<div>').text(response.city.name + " (" + date + ")");
    // console.log(response.city.name + " (" + date + ")");
    
    
    const windEl = $('<div>').text("Wind speed: " + response.list[0].wind.speed + " KPH");
    // console.log("Wind speed: " + response.list[0].wind.speed + " KPH");
    const tempEl = $('<div>').text("Temperature: "+ tempC.toFixed(1) + " °C");
    
    const humidityEl = $('<div>').text("Humidity: "+ response.list[0].main.humidity + "%");
    // console.log("Humidity: "+ response.list[0].main.humidity + "%");

    $('#today').append(cityEl, tempEl, windEl, humidityEl);
  
  });
  })