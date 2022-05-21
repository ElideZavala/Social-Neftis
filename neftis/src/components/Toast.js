import React from 'react';

const Toast = ({msg, handleShow, bgColor}) => {
	return ( 
		<div className='toast' style={{backgroundColor: bgColor}}>
			<div className='toast__header'>
				<h5 className='toast__header--title'>{msg.title}</h5>
				<small onClick={handleShow} className='toast__header--icon'>&times;</small>
			</div>

			<div className='toast__body'>
				<p>{msg.body}</p>
			</div>	
		</div>


	 );
}
 
export default Toast;