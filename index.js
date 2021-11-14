function fetchTimeWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +city+ '&appid=c7252a0b6de273d8802cd2ec709ddb9e')  
    .then(response => response.json() )
    .then(function(data) {
      displayWeather(data);
    })
    .catch(function(error){
    alert("Please type the correct name!")
    console.log(error)  
    })
    
    fetch('https://api.ipgeolocation.io/timezone?apiKey=3c97c7a89cc840ddab92b0c29815babf&location='+city)
    .then(response => response.json() )
    .then(function(data) {
      displayTime(data);
    })
    .catch(function(error){
    alert("Please type the correct name!")
    console.log(error)  
    })

    document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+city+"')"
    document.querySelector("#cityImage").src='https://source.unsplash.com/1600x900/?'+city
    
};
//       
function displayWeather(data){
    console.log(data)
    cityName=data.name;
    countryName=data.sys['country'];
    tempKev=data.main['temp'];
    tempCel=Math.round(parseInt(tempKev)-273.15);
    icon=data.weather['0'].icon;
    descriptionOne=data.weather['0'].main;
    descriptionTwo=data.weather['0'].description;
    humidity=data.main['humidity'];

    document.querySelector("#city").innerText=`Weather in ${cityName}, ${countryName} today!`;
    document.querySelector("#temp").innerText= `${tempCel}°C`;
    document.querySelector("#description").innerText=`${descriptionOne} - ${descriptionTwo}`;
    document.querySelector("#humidity").innerText=`Humidity: ${data.main['humidity']} %`;
    document.querySelector("#icon").src='http://openweathermap.org/img/wn/'+icon+'@2x.png';
    document.querySelector(".weather").classList.remove("loading");
}
//
function displayTime(data){
    console.log(data)
    cityTime=data.date_time_txt
    document.querySelector("#time").innerText=cityTime
}
//

const searchInput=document.querySelector(".search-bar")

document.querySelector(".search-button").addEventListener("click",(event)=>{
event.preventDefault()
fetchTimeWeather(searchInput.value)
})

document.querySelector(".search-bar").addEventListener("keyup", (event)=>{
event.preventDefault()
if(event.key=="Enter"){
fetchTimeWeather(searchInput.value)    
}
})

//

const taskInput=document.querySelector("#task-bar")
const taskList=document.querySelector('#tasks')

document.querySelector("#taskForm").addEventListener("submit",(event)=>{
event.preventDefault();
list=document.createElement("li")
list.innerHTML=`${taskInput.value} <button onclick="deleteTask(event)">x</button>`
taskList.append(list)})
 
function deleteTask(event){
alert ("Do you want to delete it?")
event.target.parentNode.remove()}

function loadNewForm () {
    Array.from(document.querySelectorAll("#task-bar")).forEach(
      input => (input.value = ""));
    this.setState({
      itemvalues: [{}]
    });
  };