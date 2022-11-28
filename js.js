const page = document.querySelector(".form");
const api = "2dfc17df4cecdabd595fb57de7c38955";
const input = document.querySelector(".form input");
const msg = document.querySelector(".form .msg");
const list = document.querySelector(".right");
const newYork = document.querySelector("#newYork");
const london = document.querySelector("#london");
const tokyo = document.querySelector("#tokyo");
const losAngeles = document.querySelector("#la");
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#bottom");

function date(timezone){
    var currentdate = new Date(); 
    currentdate.setSeconds(currentdate.getSeconds() + timezone);
    let newest = currentdate.toUTCString();
    newest = newest.slice(0, -7);
    return newest;
}


page.addEventListener("submit", e => {weatherCall(e);});

london.addEventListener("click", e => {weatherCall(e, "london");});

newYork.addEventListener("click", e => { weatherCall(e, "new+york");});

tokyo.addEventListener("click", e => {weatherCall(e,"tokyo");});

losAngeles.addEventListener("click", e => {weatherCall(e, "los+angeles");});

function weatherCall(e, name){
    e.preventDefault();

    let inputVal = input.value;
    if(inputVal==""){
        inputVal = name
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const { main, name, sys, weather, wind, timezone } = data;
        const li = document.createElement("div");
        li.classList.add("mainInfo");
        const newHTML = `
            <p id="temp">${Math.round(main.temp*(9/5)+32)}°F</p>
            <span id="city">${name}
                <br>
                <p id="data">${date(timezone)}</p>
            </span>
            <div class="weathercond">
                <i class="wi ${iconChecker(weather[0]["icon"])}" style="font-size: 3em; text-align: center;" id="icon"></i>
                <p id="desc">${capitalize(weather[0]["description"])}</p>
            </div>
        `;
        li.innerHTML = newHTML;
        list.replaceChild(li,document.querySelector(".mainInfo"));

        const container = document.createElement("div");
        container.classList.add("xtraweather");
        const newestHTML = `
            <h4 class="info" id="condition">Weather Conditions</h4>
            <p class="info" id="feelsLike"> Feels Like: ${Math.round(main.feels_like*(9/5)+32)}°F</p>
            <p class="info" id="humidity">Humidity: ${main.humidity}%</p>
            <p class="info" id="bottom">Wind Speed: ${wind.speed} MPH</p>
            `;
        container.innerHTML = newestHTML;
        page.replaceChild(container,page.querySelector(".xtraweather"));
    })
    .catch(() => {
      msg.textContent = "Please enter a valid location";
    });


    msg.textContent = "";
    page.reset();
    input.focus();
  }

  function iconChecker(id){
    if(id.includes("d")){
        if(id.includes("01")){
            return "wi-day-sunny";
        }
        if(id.includes("02")){
            return "wi-day-cloudy";
        }
        if(id.includes("03")){
            return "wi-cloud";
        }
        if(id.includes("04")){
            return "wi-cloudy";
        }
        if(id.includes("09")){
            return "wi-rain";
        }
        if(id.includes("10")){
            return "wi-day-rain";
        }
        if(id.includes("11")){
            return "wi-day-thunderstorm";
        }
        if(id.includes("13")){
            return "wi-day-snow";
        }
        if(id.includes("50")){
            return "wi-day-fog";
        }
    }

    if(id.includes("n")){
        if(id.includes("01")){
            return "wi-night-clear";
        }
        if(id.includes("02")){
            return "wi-night-alt-cloudy";
        }
        if(id.includes("03")){
            return "wi-cloud";
        }
        if(id.includes("04")){
            return "wi-night-alt-partly-cloudy";
        }
        if(id.includes("09")){
            return "wi-night-alt-rain";
        }
        if(id.includes("10")){
            return "wi-night-rain";
        }
        if(id.includes("11")){
            return "wi-night-thunderstorm";
        }
        if(id.includes("13")){
            return "wi-night-alt-snow";
        }
        if(id.includes("50")){
            return "wi-night-fog";
        }
    }
  }

  function capitalize(str){
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    
    return words.join(" ");
  }