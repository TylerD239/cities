const express = require('express')
const fetch = require('node-fetch')
const app = express()
const path = require('path')

const PORT = 80

app.listen(PORT, ()=>console.log(`started on port ${PORT}`))


app.use('/', express.static(path.join(__dirname,'client', 'build')))

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.use('/api/getWeather', function(req, res, next) {
console.log('Search...')
 const getWeather = async () => {

	const city = req.headers.city

	const geo_api = await fetch(`http://search.maps.sputnik.ru/search/addr?q=${city}`, {method: 'GET'})

	const geo = await geo_api.json()

	if (!geo.result.address) {
		res.send({'error':'no city'})
	} else {

 	const coords =  geo.result.address[0].features[0].geometry.geometries[0].coordinates
	const weather_api = await fetch(`https://api.weather.yandex.ru/v1/forecast?lat=${coords[1]}&lon=${coords[0]}`, 
	  	{method: 'GET',
    	headers: {
		'X-Yandex-API-Key': 'b32db626-2c9c-4c54-a244-6cbb107906b7'
    		}
        	 })

	  const weather = await weather_api.json()

	  res.send({weather, geo})
		}
 	}
	const base = async () => {
		await fetch("https://cities-b0bdb.firebaseio.com/data.json", {
			method: "POST",
			body: JSON.stringify({"city": decodeURI(city)})
		})
	}

	base()
	getWeather()


});
