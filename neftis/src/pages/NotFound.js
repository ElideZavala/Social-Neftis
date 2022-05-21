import React from 'react'
import '../styles/NotFound.scss'
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
	 <div className='notFound'>
		 <h2 className='notFound-text'>Not Found</h2>
		 <p className='notFound-found'>
			 Go to Home page 
			 <Link to="/" className='notFound-link'>Here</Link>
		 </p>
		 
	 </div>
  )
}

export default NotFound