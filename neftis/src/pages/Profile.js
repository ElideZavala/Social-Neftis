import React from 'react'
import Info from '../components/Info';
import About from '../components/About';
import Posts from '../components/Posts'

const Profile = () => {
	return ( 
		<div className="profile">
			<Info/>
			<div className='profile__body'>
				<div className='profile__body--left'>
					<About/>
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