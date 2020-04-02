import React from 'react'

export const Weather = (weather) => {
	console.log(weather)
	return (
	<div style={{maxWidth: '700px', margin: '2rem auto'}}>
		{weather.error && 
			<div className="alert alert-danger" role="alert">
			 	 {weather.error}
			</div>}		
		{weather.pressure &&
			<ul className="list-group" >
				<li className="list-group-item">Расположение: <strong>{weather.place || 'Центральная точка страны'}</strong></li>
			  	<li className="list-group-item">Температура: <strong>{weather.temp}&deg;</strong></li>
			 	<li className="list-group-item">Давление: <strong>{weather.pressure} мм</strong></li>
			 	<li className="list-group-item">Скорость ветра: <strong>{weather.speed} м/с</strong></li>
			</ul>

		}
	</div>
	)
}

