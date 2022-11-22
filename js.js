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
        const icon = `https://openweathermap.org/img/wn/${
            weather[0]["icon"]
            }@2x.png`;
 
        const li = document.createElement("li");
        li.classList.add("card");
        const newHTML = `
            <li class="card">
                <i class="wi wi-night-sleet" style="font-size: 3em; text-align: center;"></i>
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

