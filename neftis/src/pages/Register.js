import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions'


const Register = () => {
	const initialState = {username:'', fullname:'', email:'', password:'', confirmPassword:'', gender:'male'}
	
	const [showpass, setShowpass] = useState(false)
	const [showconfpass, setShowconfpass] = useState(false)
	const [userData, setuserData] = useState(initialState)
	const {username, fullname, email, password, confirmPassword, gender} = userData;

	const { auth, alert } = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory(); // Mandar al Usuario a una ruta de inicio.

	const handleChange = (e) => {
		const {name, value} = e.target;
		setuserData({...userData, [name]:value})
	}

	// Nos llevara hasta la pagina principal.
	useEffect(() => {
		if(auth.token) {
			history.push('/')
		}
	},[auth.token, history])

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register(userData));
	}

  return (
	<div className="register "> {/* Colocar el thema Dark */}
	<div className="register__theme"></div>
	<h3 className="register__header">Social <span>Neftis</span></h3>
	<h6 className="register__subheader">Register</h6>
	<div className="register__data">
		<form className="register__data--form" onSubmit={handleSubmit}>
			<input 
				className="register__data--form__fullname"
				type="text"
				value={fullname}
				name="fullname"
				onChange={handleChange} 
				placeholder= {alert.fullname ? `${alert.fullname}` : 'Enter your fullname'}
				style={{background: `${alert.fullname ? '#E84A5F' : ' '}`, 
				color: `${alert.fullname ? '#000' : ' '}`}}>
			</input>			 

			<input 
				className="register__data--form__username"
				type="text"
				name="username"
				value={username.toLowerCase().replace(/ /g,'')} /* Union de las palabras*/
				onChange={handleChange} 
				placeholder= {alert.username ? `${alert.username}` : 'Enter your Username'}
				style={{background: `${alert.username ? '#E84A5F' : ' '}`, 
				color: `${alert.username ? '#000' : ' '}`}}>
			</input>

			<input 
				className="register__data--form__email"
				type="email"
				value={email}
				name="email"
				onChange={handleChange}
				placeholder= {alert.email ? `${alert.email}` : 'Enter your Email'}
				style={{background: `${alert.email ? '#E84A5F' : ' '}`, 
				color: `${alert.email ? '#000' : ' '}`}}>
			</input>

			<input 
				className="register__data--form__password"
				type={showpass ? "type" : "password"}
				value={password}
				name="password"
				onChange={handleChange} 
				placeholder= {alert.password ? `${alert.password}` : 'Enter your Password'}
				style={{background: `${alert.password ? '#E84A5F' : ' '}`, 
				color: `${alert.password ? '#000' : ' '}`}}>
			</input>

			<small className="register__data--form__showRegPass" onClick={()=>setShowpass(!showpass)}>{showpass ? "Hide" : "Show" }</small>

			<input 
				className="register__data--form__confirmPassword"
				type={showconfpass ? "type" : "password"}
				value={confirmPassword}
				name="confirmPassword"
				onChange={handleChange}
				placeholder= {alert.confirmPassword ? `${alert.confirmPassword}` : 'Enter your ConfirmPassword'}
				style={{background: `${alert.confirmPassword ? '#E84A5F' : ' '}`, 
				color: `${alert.confirmPassword ? '#000' : ' '}`}}>
			</input>

			<small className="register__data--form__showRegConfPass" onClick={()=>setShowconfpass(!showconfpass)}>{showconfpass ? "Hide" : "Show" }</small>

			<select 
				className="register__data--form__select" 
				name="gender"
				value={gender} 
				onChange={handleChange}
			 	placeholder="Gender">
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="other">Other</option>
			</select>


			<button className="register__data--form__button" type="submit">Sing Up</button>
			<small  className="register__data--form__small">Already have an account <Link to="/">Log In Here</Link></small>
		</form>
	</div>
 </div>
  )
}

export default Register