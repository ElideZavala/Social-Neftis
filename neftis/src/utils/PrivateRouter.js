import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouter = ( {props} ) => {
	const login = localStorage.getItem('login')
	return login ? <Route {...props}/> : <Redirect to= "/"/>
	
}
 
export default PrivateRouter