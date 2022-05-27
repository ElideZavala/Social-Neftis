import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const Login = () => {
	const initialState = {email: '', password: ''}
	const history = useHistory();
	const { auth } = useSelector(state => state)
	const [showpass, setShowpass] = useState(false)
	const [userData, setUserData] = useState(initialState)
 	const dispatch = useDispatch();
	
	 useEffect(() => {
		if(auth.token) {
			history.push('/')
		}
	},[auth.token, history]);

	const {email, password} = userData; 
 
 	// Cada que cambie nuestro nombre y email. 
	const handleChange = (e) => {
		const {name, value} = e.target;
		setUserData({...userData, [name]: value})
	}

	// Cuando demos Submit a nuestro form. 
	const handleSubmit = (e) => {
		e.preventDefault()
		// setUserData({email, password})
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
				
				<small className="login__data--form__showpass" onClick={()=>setShowpass(!showpass)}>{showpass ? <VisibilityOffIcon/> : <VisibilityIcon/> }</small>

				<button className="login__data--form__button" type="submit">Log In</button>
				<p className="login__data--form__small">Do not have account <Link to="register">Create Here</Link></p>
			</form>
		</div>
    </div>
  )
}

export default Login
