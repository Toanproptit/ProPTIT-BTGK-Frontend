function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}


const countries = {
  VN: "Vietnam",
  US: "United States",
  JP: "Japan",
  // thêm các nước khác
};


const API_KEY = "d2061f4a074a6516611f7d121428db0a"; // Thay bằng API key từ OpenWeatherMap

navigator.geolocation.getCurrentPosition(success, error);

async function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  // Lấy ngày hiện tại và chuyển sang thứ
  const date = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[date.getDay()];

  const countryUrl = data.sys.name;
  
  document.getElementById("country").textContent = `${data.name}`;
  document.getElementById("day").textContent = `${today}`;
  document.getElementById("date").textContent = `${date.toLocaleDateString()}`;
  document.getElementById("temp").textContent = `${data.main.temp}°C`;
  document.getElementById("temp_max+min").textContent = `High: ${data.main.temp_max} Low: ${data.main.temp_min}`;

  
    const sunRise = data.sys.sunrise;
    const sunRiseDate = new Date(sunRise*1000);
    const sunRiseTime = sunRiseDate.toLocaleTimeString("en-US",{hour: "2-digit",minute: "2-digit",hour12:true});
  
    const sunSet = data.sys.sunset;
    const sunSetDate = new Date(sunSet*1000);
    const sunSetTime = sunSetDate.toLocaleTimeString("en-US",{hour: "2-digit",minute: "2-digit",hour12:true});

    const dayLengthOfDay = sunSet-sunRise
    const hours = Math.floor(dayLengthOfDay/3600);
    const minute = Math.floor((dayLengthOfDay%3600)/60)

  document.getElementById("lengthftheday").textContent = `${hours}h ${minute}m`;
  document.getElementById("sunset").textContent = `${sunSetTime}`;
  document.getElementById("sunrise").textContent = ` ${sunRiseTime}`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const iconUrl1 = `https://openweathermap.org/img/wn/02d@2x.png`;
  const iconUrl2 = `https://openweathermap.org/img/wn/02d@2x.png`;
  const iconUrl3 = `https://openweathermap.org/img/wn/01d@2x.png`;
  const iconUrl4 = `https://openweathermap.org/img/wn/01d@2x.png`;
  const iconUrl5 = `https://openweathermap.org/img/wn/02d@2x.png`;
  const iconUrl6 = `https://openweathermap.org/img/wn/04d@2x.png`;
  const iconUrl7 = `https://openweathermap.org/img/wn/04d@2x.png`;

  document.getElementById("weather-icon7").src = iconUrl7;
  document.getElementById("weather-icon6").src = iconUrl6;
  document.getElementById("weather-icon5").src = iconUrl5;
  document.getElementById("weather-icon4").src = iconUrl4;
  document.getElementById("weather-icon3").src = iconUrl3;
  document.getElementById("weather-icon2").src = iconUrl2;
  document.getElementById("weather-icon1").src = iconUrl1;
  document.getElementById("weather-icon").src = iconUrl;
  document.getElementById("weather-icon").alt = data.weather[0].description;
  document.getElementById("main").textContent = `${data.weather[0].main}`;
  document.getElementById("feels_main").textContent = `feels like ${data.main.feels_like}`;
  document.getElementById("feels_main1").textContent =  `${data.weather[0].main}`;
}

function error() {
  document.getElementById("location").textContent = "Unable to retrieve location.";
}

const cities = [
  { name: "USA", query: "New York,US" },
  { name: "Dubai", query: "Dubai,AE" },
  { name: "China", query: "Beijing,CN" },
  { name: "Nam-Định", query: "Nam Dinh,VN" }
];

async function getWeather(cityQuery) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function loadAllCities() {  
  for (let city of cities) {
    const data = await getWeather(city.query);
    console.log(city.name, data.main.temp, data.weather[0].main,data.main.temp_max,data.main.temp_min);

    // Gắn vào HTML
    document.getElementById(`temp-${city.name}`).textContent = `${data.main.temp}°C`;
    document.getElementById(`temp-max-min-${city.name}`).textContent = `H${data.main.temp_max} L${data.main.temp_min}`;
    document.getElementById(`icon-${city.name}`).src =`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
}

loadAllCities();

document.getElementById("searchInput").addEventListener("keydown",async function (event) {
  if(event.key=="Enter"){
    const cityName = this.value.trim();
    if(!cityName)return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if(data.cod == 200){
       document.getElementById("country").textContent = `${data.name}`;
      document.getElementById("day").textContent = new Date().toLocaleDateString("en-US", { weekday: "long" });
      document.getElementById("date").textContent = new Date().toLocaleDateString();
      document.getElementById("temp").textContent = `${data.main.temp}°C`;
      document.getElementById("temp_max+min").textContent = `High: ${data.main.temp_max} Low: ${data.main.temp_min}`;
      document.getElementById("main").textContent = data.weather[0].main;
      document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

       const sunRise = data.sys.sunrise;
        const sunRiseDate = new Date(sunRise*1000);
        const sunRiseTime = sunRiseDate.toLocaleTimeString("en-US",{hour: "2-digit",minute: "2-digit",hour12:true});
      
        const sunSet = data.sys.sunset;
        const sunSetDate = new Date(sunSet*1000);
        const sunSetTime = sunSetDate.toLocaleTimeString("en-US",{hour: "2-digit",minute: "2-digit",hour12:true});

        const dayLengthOfDay = sunSet-sunRise
        const hours = Math.floor(dayLengthOfDay/3600);
        const minute = Math.floor((dayLengthOfDay%3600)/60)

      document.getElementById("lengthftheday").textContent = `${hours}h ${minute}m`;
      document.getElementById("sunset").textContent = `${sunSetTime}`;
      document.getElementById("sunrise").textContent = ` ${sunRiseTime}`;
    }
    else{
      alert("Không tìm thấy thành phố này!!!");
    }
  }
});


const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

function toggleTheme() {
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
}

themeToggleButton.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }
});