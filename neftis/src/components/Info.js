import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const Info = () => {
	
	const [userData, setUserData] = useState([])
	const { id } = useParams();
	const {auth} = useSelector(state => state)
	const dispatch = useDispatch();

	// Al principio, la tienda redux no está definida. tomará tiempo
	useEffect(() => { 
		if( auth && auth.user && id === auth.user._id) {
			setUserData(auth.user)
		}
	} , [id, auth.user, auth])
	console.log(userData)

	return ( 
		<div className="profileInfo">
			{userData.length > 0 && userData.map((user => (
				<div className='profileInfo__container' key={user._id}>
					<div className='profileInfo__container--top'>
						<img src={user.avatar} alt="avatar" className='profileInfo__container--top__avatar'/>
					</div>
				</div>
			)))}
		</div>
	);
}
	
export default Info;