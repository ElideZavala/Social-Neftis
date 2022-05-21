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

	const { auth } = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory(); // Mandar al Usuario a una ruta de inicio.

	const handleChange = (e) => {
		const {name, value} = e.target;
		setuserData({...userData, [name]:value})
	}

	// useEffect(() => {
	// 	if(auth.token) {
	// 		history.push('/')
	// 	}
	// },[auth.token, history])

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
				placeholder="Type your fullname">
			</input>

			<input 
				className="register__data--form__username"
				type="text"
				name="username"
				value={username.toLowerCase().replace(/ /g,'')} /* Union de las palabras*/
				onChange={handleChange} 
				placeholder="Type your Username">
			</input>

			<input 
				className="register__data--form__email"
				type="email"
				value={email}
				name="email"
				onChange={handleChange}
				placeholder="Type your Email">
			</input>

			<input 
				className="register__data--form__password"
				type={showpass ? "type" : "password"}
				value={password}
				name="password"
				onChange={handleChange} 
				placeholder="Type your password">
			</input>
			<small className="register__data--form__showRegPass" onClick={()=>setShowpass(!showpass)}>{showpass ? "Hide" : "Show" }</small>

			<input 
				className="register__data--form__confirmPassword"
				type={showconfpass ? "type" : "password"}
				value={confirmPassword}
				name="confirmPassword"
				onChange={handleChange}
				placeholder="Confirm your Password">
			</input>

			<select 
				className="register__data--form__select" 
				name="gender"
				value={gender} 
				onChange={handleChange}
			 	placeholder="Gender">
				<option value="">Gender:</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="other">Other</option>
			</select>

			<small className="register__data--form__showRegConfPass" onClick={()=>setShowconfpass(!showconfpass)}>{showconfpass ? "Hide" : "Show" }</small>

			<button className="register__data--form__button" type="submit">Sing Up</button>
			<small  className="register__data--form__small">Already have an account <Link to="/">Log In Here</Link></small>
		</form>
	</div>
 </div>
  )
}

export default Register