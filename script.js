document.addEventListener('DOMContentLoaded', function(){
   
   const apiKey = 'fa1a2776473e1a0286288a7670748599';
   const diffKelvin = 273.15;

   document.getElementById('searchButton').addEventListener('click', () => {
      const cityName = document.getElementById('cityInput').value;

      if(cityName){
         searchData(cityName);
      }else{
         alert('Ingrese una ciudad válida');
      }
   });
   

   async function searchData(city){
      try{
         const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es`); 
         
         if(!res.ok){
            throw new Error('Error en la solicitud: ' + res.statusText);
         }
         const data = await res.json();
         showWeatherData(data);
         

      }catch(error){
         console.error('Hubo un problema con la solicitud fetch:', error);
      }
      
   };

   function showWeatherData(data){
      const divResponseData = document.getElementById('responseData');
      divResponseData.innerHTML = ``;

      const cityName = data.name;
      const country = data.sys.country;
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const icon = data.weather[0].icon;
      const description = data.weather[0].description;

      const cityInfo = document.createElement('h2');
      cityInfo.textContent = `${cityName}, ${country}`;

      const tempInfo = document.createElement('p');
      tempInfo.textContent = `La temperatura es: ${Math.floor(temp-diffKelvin)}°C`;

      const humidityInfo = document.createElement('p');
      humidityInfo.textContent =`La humedad es del: ${humidity}%`;

      const iconInfo = document.createElement('img');
      iconInfo.src = ` https://openweathermap.org/img/wn/${icon}@2x.png`;
      
      const descriptionInfo = document.createElement('p');
      descriptionInfo.textContent = `La descripción meteorológica es ${description}`;

      divResponseData.appendChild(cityInfo);
      divResponseData.appendChild(tempInfo);
      divResponseData.appendChild(humidityInfo);
      divResponseData.appendChild(iconInfo);
      divResponseData.appendChild(descriptionInfo);
   }
   
   
})