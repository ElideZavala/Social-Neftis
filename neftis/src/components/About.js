import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfileUsers } from '../redux/actions/profileActions';


const About = () => {

	const [ userData, setUserData ] = useState([])
	const { id } = useParams();
	const { auth, profile } = useSelector(state => state)
	const dispatch = useDispatch();

	// Al principio, la tienda redux no está definida. tomará tiempo
	useEffect(() => { 
		if( auth && auth.user && id === auth.user.id) {
			setUserData([auth.user])
		} else {
			dispatch(getProfileUsers({users: profile.users, id, auth}))
			const newData = profile.users.filter(user => user.id === id); // ==> Regresara un array 
			setUserData(newData);  // ==> Este ya es un array
		}
	} , [id, auth.user, auth]);

	return ( 
		<div className='about'>
			{userData.length > 0 && userData.map(user => (
				<div className='about__container' key={user.id}>
					<div className='about__container--top'>
						<h4 className='about__container--top__bio'>Bio</h4>
					</div>
					<div className='about__container--center'>
						<p className='about__container--top__story'>{user.story}</p>
					</div>
					<div className='about__container--bottom'>
						<div className='about__container--bottom__info'>
							<h6> Joined </h6>
							<p> {user.createdAt} </p>
						</div>
						<div className='about__container--bottom__info'>
							<h6> Gender </h6>
							<p> {user.gender} </p>
						</div>
						<div className='about__container--bottom__info'>
							<h6> Phone </h6>
							<p> {user.phone} </p>
						</div>
						<div className='about__container--bottom__info'>
							<h6> Email </h6>
							<p> {user.email} </p>
						</div>
						<div className='about__container--bottom__info'>
							<h6> Website </h6>
							<p> {user.website} </p>
						</div>
					</div>
				</div>
			))}
		</div>
	 );
}
 
export default About;