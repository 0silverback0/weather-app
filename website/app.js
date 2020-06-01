const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&units=imperial&appid=ba1b55a1f42012c5a6a96317ed4392c6';
const d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let today = months[d.getMonth()] +'/'+ d.getDate() +'/'+ d.getFullYear();
//console.log(today);
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
	 zip = document.getElementById('zip').value;

	 getWeather(baseURL,zip,apiKey)
		.then(function(data){
			postData('/addWeather',{temperature: data.main.temp, date: today, userResponse: zip});
		})
		.then(
			 updateUI()
			 )
			}

const getWeather = async (baseURL,zip, apiKey) =>{
	const res = await fetch(baseURL+zip+apiKey)
	try{
		const data = await res.json();
		//console.log(data); //this is all returned data
		return data;
	} catch(error) {
		console.log("error at getWeather", error);
	}
}

const postData = async ( url = '', data = {}) =>{
	//console.log(data);// This is the wanted data
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
		//console.log(newData); // this is data going to server
	}catch(error){
		console.log("error at post data", error);
	}
}

const updateUI = async () => {
  const request = await fetch('/getData');
  try{
    const allData = await request.json();
    console.log(allData);
      document.getElementById('date').innerHTML = today;
      document.getElementById('zipCode').innerHTML = allData.zip;
      document.getElementById('temp').innerHTML = allData.temp;

  }catch(error){
    console.log("error at updateUI", error);
  }
}
