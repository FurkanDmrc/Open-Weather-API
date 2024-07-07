

const apiKey = "1add97f4098faa103d10bffe724e402e";

const weatherDataEl = document.getElementById("weather-data")
const inputEl = document.getElementById("sehir")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", function (event) {

    event.preventDefault();
    const gelenSehir = inputEl.value;

    havaDurumunuAl(gelenSehir)

})

async function havaDurumunuAl(gelenSehir) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${gelenSehir}&appid=${apiKey}&units=metric`)

        if (!response.ok) {
            throw new Error("Api Response Hatası")
        }

        const data = await response.json()

        console.log(data)

        const temp = Math.round(data.main.temp)

        const desc = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `Hissettiren: ${Math.round(data.main.feels_like)}`,
            `Nem:${data.main.humidity}%`,
            `Rüzgar Hızı:${data.wind.speed} km/h`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="WeatherIcon">`
        weatherDataEl.querySelector(".temperature").textContent = `${temp}°C`
        weatherDataEl.querySelector(".description").textContent = desc

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `
        <div>${detail}</div>`).join("");


    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = ``
        weatherDataEl.querySelector(".temperature").textContent = ``
        weatherDataEl.querySelector(".description").textContent = "Bir hata meydana geldi! Girdiğiniz Değeri Kontrol Edin!"

        weatherDataEl.querySelector(".details").innerHTML = ""
    }


}