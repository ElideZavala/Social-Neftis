import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getProfileUsers } from '../redux/actions/profileActions';

// ===================  Photos =====================
// import  wallpaper  from "../images/avatar/wallpaper.jpg";
// import  avatar  from "../images/avatar/banner.png";
import  avatar  from "../images/avatar/perfile.png";
import  wallpaper  from "../images/avatar/gradiente.png";

// =================== Coponents =====================
import EditProfile from './EditProfile';
import GlobalFriendBtn from './GlobalFriendBtn';


const Info = ({userData, profile, auth, id }) => {
	const [onEdit, setOnEdit] = useState(false); 
	// const [ userData, setUserData ] = useState([])
	// const { id } = useParams();
	// const { auth, profile } = useSelector(state => state)
	// const dispatch = useDispatch();
	// console.log(auth);

	// // Al principio, la tienda redux no está definida. tomará tiempo
	// useEffect(() => { 
	// 	if( auth && auth.user && id === auth.user.id) {
	// 		setUserData([auth.user])
	// 	} else {
	// 		dispatch(getProfileUsers({users: profile.users, id, auth}))
	// 		const newData = profile.users.filter(user => user.id === id); // ==> Regresara un array 
	// 		setUserData(newData);  // ==> Este ya es un array
	// 	}
	// } , [id, auth.user, auth, profile.users, dispatch]);
	return ( 
		<div className="profileInfo">
			{ userData.length > 0 && userData.map((user => (
				<div className='profileInfo__container' key={user._id}>
					<div className='profileInfo__container--top'>
						{/* <img src={auth.avatar === '' ? photo : wallpaper } alt="avatar" className='profileInfo__container--top__avatar'/> */}
						<img src={user.wallpaper === '' ? wallpaper : user.wallpaper} alt="wallpaper" className='profileInfo__container--top__avatar'/>
						{/* <img src={wallpaper} alt="avatar" className='profileInfo__container--top__avatar'/> */}
					</div>
					<div className="profileInfo__container--center">
						<img src={user.avatar === '' ? avatar : user.avatar} className="profileInfo__container--center__avatar" />

						{ user._id && auth && user._id === auth.user._id ? 
						// {/* <img src={photo} className="profileInfo__container--center__avatar" /> */}
						<button className="profileInfo__container--center__add" onClick={() => setOnEdit(true)}
						><span>&#43;</span>EDIT PROFILE</button>
						: <GlobalFriendBtn classbtn="profileInfo__container--center__add" />}
					</div>
					<div className="profileInfo__container--bottom">
						<div className="profileInfo__container--bottom__center">
							<h3 className="profileInfo__container--bottom__center--fullname">{user.fullname}</h3>
							<h5 className="profileInfo__container--bottom__center--username">{user.username}</h5>
						</div>
						<div className="profileInfo__container--bottom__left">
							<div className="profileInfo__container--bottom__left">
								<h6 className="profileInfo__container--bottom__left--number">{user.friends.length}</h6>
								<h6 className="profileInfo__container--bottom__left--desc">FRIENDS</h6>
							</div>
							<div className="profileInfo__container--bottom__left">
								<h6 className="profileInfo__container--bottom__left--number">{user.following.length}</h6>
								<h6 className="profileInfo__container--bottom__left--desc">FOLLOWING</h6>
							</div>
						</div>
					</div>
					{
						onEdit && <EditProfile user={user} setOnEdit={setOnEdit}/>
					}
				</div>
			)))}
		</div>
	)
}
	
export default Info;