const page = document.querySelector(".form");
const api = "2dfc17df4cecdabd595fb57de7c38955";
const input = document.querySelector(".form input");
const msg = document.querySelector(".form .msg");
const list = document.querySelector(".locations");

page.addEventListener("submit", e => {
    console.log("!!!!")
    e.preventDefault();
    const inputVal = input.value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const { main, name, sys, weather } = data;
       
        
    
 
        const li = document.createElement("li");
        li.classList.add("card");
        console.log(iconChecker(weather[0]["icon"]));
        console.log(weather[0]["icon"]);
        const newHTML = `
            <li class="card">
                <i class="wi ${iconChecker(weather[0]["icon"])}" style="font-size: 3em; text-align: center;"></i>
                <div class="card-info">
                    <h4><b>${name}</b></h4>
                    <p>${Math.round(main.temp*(9/5)+32)}°F <br> ${weather[0]["description"]}</p>
                </div>
            </li>
        `;
        li.innerHTML = newHTML;
        list.appendChild(li);

    })
    .catch(() => {
      msg.textContent = "Please enter a valid location";
    });


    msg.textContent = "";
    page.reset();
    input.focus();
  });


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
