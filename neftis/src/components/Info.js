import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  Avatar  from '@material-ui/core/Avatar';
import { useParams } from "react-router-dom";
import  wallpaper  from "../images/avatar/wallpaper.jpg";
import  photo  from "../images/avatar/banner.png";
import  perfileImg  from "../images/avatar/perfile.png";
// import  gradiente  from "../images/avatar/gradiente.png";



const Info = () => {
	const [userData, setUserData] = useState([])
	const { id } = useParams();
	const {auth} = useSelector(state => state)
	const dispatch = useDispatch();

	// Al principio, la tienda redux no está definida. tomará tiempo
	useEffect(() => { 
		if( auth && auth.user && id === auth.user.id) {
			setUserData([auth.user])
		}
	} , [id, auth.user, auth]);

	return ( 
		<div className="profileInfo">
			{ userData.length > 0 && userData.map((user => (

				<div className='profileInfo__container' key={user._id}>
					<div className='profileInfo__container--top'>
						<img src={auth.avatar === '' ? photo : wallpaper } alt="avatar" className='profileInfo__container--top__avatar'/>
						{/* <img src={wallpaper} alt="avatar" className='profileInfo__container--top__avatar'/> */}
					</div>
					<div className="profileInfo__container--center">
						<img src={auth.avatar === '' ? photo : perfileImg } className="profileInfo__container--center__avatar" />
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