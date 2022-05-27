import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';

const Info = () => {
	
	const [userData, setUserData] = useState([])
	const { id } = useParams();
	const {auth} = useSelector(state => state)
	const dispatch = useDispatch();

	// Al principio, la tienda redux no está definida. tomará tiempo
	useEffect(() => { 
		if( auth && auth.user && id === auth.user._id) {
			setUserData([auth.user])
		}
	} , [id, auth.user, auth])
	

	return ( 
		<div className="profileInfo">
			{console.log(userData)}
			{userData.length > 0 && userData.map((user => (
				<div className='profileInfo__container' key={user._id}>
					<div className='profileInfo__container--top'>
						<img src={user.avatar} alt="avatar" className='profileInfo__container--top__avatar'/>
					</div>
					<div className="profileInfo__container--center">
						<Avatar src={user.avatar} className='profileInfo__container--center__avatar'/>
						<button>ADD FRIEND</button>
					</div>
					<div className="profileInfo__container--bottom">
						<div className="profileInfo__container--bottom__left">
							<div className="profileInfo__container--bottom__stat">
								<h6 className="profileInfo__container--bottom__stat--number">{user.friends.length}</h6>
								<h6 className="profileInfo__container--bottom__stat--desc">FRIENDS</h6>
							</div>
							<div className="profileInfo__container--bottom__stat">
								<h6 className="profileInfo__container--bottom__stat--number">{user.following.length}</h6>
								<h6 className="profileInfo__container--bottom__stat--desc">FOLLOWING</h6>
							</div>
						</div>
						<div className="profileInfo__container--bottom__center">
							<h3 className="profileInfo__container--bottom__center--fullname">{user.fullname}</h3>
							<h5 className="profileInfo__container--bottom__center--username">{user.username}</h5>
						</div>
					</div>
				</div>
			)))}
		</div>
	)
}
	
export default Info;