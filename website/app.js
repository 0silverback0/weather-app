//Declare global variables

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&units=imperial&appid=ba1b55a1f42012c5a6a96317ed4392c6';
const d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let today = months[d.getMonth()] +'/'+ d.getDate() +'/'+ d.getFullYear();

//add event listener for the button and create function

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
	 zip = document.getElementById('zip').value;

	 getWeather(baseURL,zip,apiKey)
		.then(function(data){
			postData('/addWeather',{temperature: data.main.temp, date: today, userResponse: zip});
			updateUI()
		})
	}

// the api call
const getWeather = async (baseURL,zip, apiKey) =>{
	const res = await fetch(baseURL+zip+apiKey)
	try{
		const data = await res.json();
		return data;
	} catch(error) {
		console.log("error at getWeather", error);
	}
}

// post data to the post route

const postData = async ( url = '', data = {}) =>{
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	try{
		const newData = await response.json();
	}catch(error){
		console.log("error at post data", error);
	}
}

//update UI with data from getData route

const updateUI = async () => {
  const request = await fetch('/getData');
  try{
    const allData = await request.json();
    console.log(allData);
      document.getElementById('date').innerHTML = 'Today is: ' + today;
      document.getElementById('zipCode').innerHTML = 'The zip code entered is: ' + allData.zip;
      document.getElementById('temp').innerHTML = 'The temperature for ' + allData.zip + ' is ' + allData.temp;

  }catch(error){
    console.log("error at updateUI", error);
  }
}
