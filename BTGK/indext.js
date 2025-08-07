function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

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

  // Gán dữ liệu vào HTML
  document.getElementById("day").textContent = `${today}`;
  document.getElementById("date").textContent = `${date.toLocaleDateString()}`;
  document.getElementById("temp").textContent = `${data.main.temp}°C`;
  document.getElementById("temp_max+min").textContent = `High: ${data.main.temp_max} Low: ${data.main.temp_min}`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


  document.getElementById("weather-icon").src = iconUrl;
  document.getElementById("weather-icon").alt = data.weather[0].description;
  document.getElementById("main").textContent = `${data.weather[0].main}`;
  document.getElementById("feels_main").textContent = `feels like ${data.main.feels_like}`;
}

function error() {
  document.getElementById("location").textContent = "Unable to retrieve location.";
}