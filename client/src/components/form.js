import React, {useState} from 'react'

export const Form = ({getW}) => {
	const [state,setState] = useState('')
	const handler = (e) => {e.preventDefault(); setState(e.target.value)}
	const submit = (e) => {
		e.preventDefault()
		getW(state)
	}
	return (
		<form onSubmit = {submit} style={{maxWidth:'700px', margin: '0 auto'}}>
			<div className="input-group mb-3">
	  			<input onChange ={handler}  type="text" name="city" className="form-control" placeholder="Введите город" />
	 			<div className="input-group-append">
	   				<button className="btn btn-outline-secondary" type="submit" id="button-addon2">Получить погоду</button>
		 		</div>
			</div>
		</form>
	)
}

