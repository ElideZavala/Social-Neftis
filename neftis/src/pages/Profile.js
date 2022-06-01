import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfileUsers } from '../redux/actions/profileActions';

// ***************** components ***********************
import Info from '../components/Info';
import About from '../components/About';
import Posts from '../components/Posts'



const Profile = () => {
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
	} , [id, auth.user, auth, profile.users, dispatch]);

	return ( 
		<div className="profile">
				<Info userData={userData} profile={profile} auth={auth} id={id} />
			<div className='profile__body'>
				<div className='profile__body--left'>
					<About userData={userData} profile={profile} auth={auth} id={id} />
				</div>
				<div className='profile__body--center'>
					<Posts/>
				</div>
				<div className='profile__body--button'>
					<Posts/>
				</div>
			</div>
		</div>
	);
}
 
export default Profile;