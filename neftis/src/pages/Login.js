import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
	const initialState = {email: '', password: ''}
	const [showpass, setShowpass] = useState(false)
	const [userData, setUserData] = useState(initialState)
 	const dispatch = useDispatch();
	const {email, password} = userData; 
 
 	// Cada que cambie nuestro nombre y email. 
	const handleChange = (e) => {
		const {name, value} = e.target;
		setUserData({...userData, [name]: value})
	}

	// Cuando demos Submit a nuestro form. 
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(login(userData))
	}

  return (
    <div className="login"> 
		<div className="login__theme"></div>
      <h3 className="login__header">Social <span>Neftis</span></h3>
		<h6 className="login__subheader">Login</h6>
		<div className="login__data">
			<form className="login__data--form" onSubmit={handleSubmit}>
				<input 
					className="login__data--form__email"
					type="email"
					name='email'
					value={email}
					onChange={handleChange} 
					placeholder="Type your email">
				</input>
				<input 
					className="login__data--form__password"
					type={showpass ? "type" : "password"} /*{Si showpass es true sera type si es false password }*/
					value={password}
					name='password'
					onChange={handleChange} 
					placeholder="Type your password">
				</input>
				<small className="login__data--form__showpass" onClick={()=>setShowpass(!showpass)}>{showpass ? "Hide" : "Show" }</small>
				<button className="login__data--form__button" type="submit">Log In</button>
				<p className="login__data--form__small">Do not have account <Link to="register">Create Here</Link></p>
			</form>
		</div>
    </div>
  )
}

export default Login
