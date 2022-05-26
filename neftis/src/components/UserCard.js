import { Avatar } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({user, handleClose}) => {
	const handleCloseAll = () => {
		if (handleClose) handleClose();
	}

	return ( 
		<div className={`${user == '' ? "userCard__none" : "userCard"}`}>
			<div className="userCard__profile">
				{/* Enlace al perfil del usuario */}
				<Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="userCard__profile--link">
					<Avatar className="userCard__profile--link__avatar" src={user.avatar}/>
					<div className="userCard__profile--link__text">
						<span className="userCard__profile--link__text--fullname">{user.fullname}</span>
						<small className="userCard__profile--link__text--username">{user.username}</small>
					</div>
				</Link>
			</div>
		</div>
	);
}
 
export default UserCard;