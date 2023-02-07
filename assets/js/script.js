// Save API key and other components of the queryURL
const apiKey = "&appid=b3bd4c3e267e6dafcf4c60c628a712e3";
const baseURL = "https://api.openweathermap.org/data/2.5/forecast?";
const units = "&units=metric"

function buildQueryURL(baseURL, city, apiKey, units) {
  return baseURL + city + apiKey + units;
}

function clear(htmlElement) {
  htmlElement.empty();
}

$('#search-form').on("submit", function(event) {
    event.preventDefault();
    clear($('#today'));
    clear($('#forecast'));
    // This line of code will grab the input from the search box
    let city = "q="+ $('#search-input').val().trim();
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
    const cityName = response.city.name;
    const date = moment().format("DD/MM/YYYY");
    // console.log(date);

    const cityEl = $('<div>').text(cityName + " (" + date + ")");
    // console.log(response.city.name + " (" + date + ")");
    cityEl.addClass('city-date-label')    

    const windEl = $('<div>').text("Wind speed: " + response.list[0].wind.speed + " KPH");
    // console.log("Wind speed: " + response.list[0].wind.speed + " KPH");
    const tempEl = $('<div>').text("Temperature: "+ tempC.toFixed(1) + " °C");
    
    const humidityEl = $('<div>').text("Humidity: "+ response.list[0].main.humidity + "%");
    // console.log("Humidity: "+ response.list[0].main.humidity + "%");

    $('#today').append(cityEl, tempEl, windEl, humidityEl);
    
    // Save history to localStorage and create elements to add entries
    localStorage.setItem('city', cityName);
    let previousCityEl = $('<li>').text(cityName);
    previousCityEl.addClass('list-group-item');
    $('.list-group').prepend(previousCityEl);
    $('#search-input').val('');

    // add contents to the 5-day forecast (test)
    $('h2').text('5-day forecast');
    const cardGroupEL = $('<div>').addClass('card-group');
    
    for (let i = 0; i < response.list.length; i+=8){
      const element = response.list[i];
      const date = element.dt_txt.slice(0,10).replace(/-/g, '/');
      const temp = element.main.temp;
      const wind = element.wind.speed;
      const hum = element.main.humidity;

      const cardTitle = $('<h5>').text(date).addClass('card-title');
      const tempP = $('<p>').text(temp.toFixed(1) + " °C");
      const windP = $('<p>').text(wind + " KPH");
      const humP = $('<p>').text(hum + "%");

      
      const cardDiv = $('<div>').addClass('card col-3');
      const cardBody = $('<div>').addClass('card-body');
      cardBody.append(cardTitle, tempP, windP, humP);
      cardDiv.append(cardBody);
      cardGroupEL.append(cardDiv);
      $('#forecast').append(cardGroupEL);
    }


  });
  })