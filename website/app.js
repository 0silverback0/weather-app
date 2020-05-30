const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&units=imperial&appid=ba1b55a1f42012c5a6a96317ed4392c6';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
	 zip = document.getElementById('zip').value;

	 getWeather(baseURL,zip,apiKey)
		.then(function(data){
			postData('/addWeather',{temperature: data.main.temp, userResponse: zip})
		})
}

const getWeather = async (baseURL,zip, apiKey) =>{
	const res = await fetch(baseURL+zip+apiKey)
	try{
		const data = await res.json();
		console.log(data)
		return data;
	} catch(error) {
		console.log("error", error);
	}
}

const postData = async ( url = '', data = {}) =>{
	//console.log(data);
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
		//console.log(newData);
	}catch(error){
		console.log("error", error);
	}
}




  