import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfileUsers } from '../redux/actions/profileActions';


const About = ({userData, profile, auth, id }) => {



	return ( 
		<div className='about'>
			{userData.length > 0 && userData.map(user => (
				<div className='about__container' key={user.id}>
					<div className='about__container--top'>
						<h4 className='about__container--top__bio'>About Me</h4>
					</div>
					<div className='about__container--center'>
						<p className='about__container--center__story'>{user.story}</p>
					</div>
					<div className='about__container--bottom'>
						<div className='about__container--bottom__info'>
							<h5 className='about__container--bottom__info--title'> Joined </h5>
							<p> {user.createdAt} </p>
						</div>
						<div className='about__container--bottom__info'>
							<h5 className='about__container--bottom__info--title'> Gender </h5>
							<p> {user.gender} </p>
						</div>
						<div className='about__container--bottom__info'>
							<h5 className='about__container--bottom__info--title'> Phone </h5>
							<p> {user.phone} </p>
						</div>
						<div className='about__container--bottom__info'>
							<h5 className='about__container--bottom__info--title'> Email </h5>
							<p> {user.email} </p>
						</div>
						<div className='about__container--bottom__info'>
							<h5 className='about__container--bottom__info--title'> Website </h5>
							<p> {user.website} </p>
						</div>
					</div>
				</div>
			))}
		</div>
	 );
}
 
export default About;