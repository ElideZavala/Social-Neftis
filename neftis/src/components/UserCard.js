import { Avatar } from '@material-ui/core';
import React from 'react'

const UserCard = ({user}) => {
	return ( 
		<div className="userCard">
			<Avatar className="userCard__avatar" src={user.avatar}/>
			<div className="userCard__text">
				<span className="userCard__text--fullname">{user.fullname}</span>
				<small className="userCard__text--username">{user.username}</small>
			</div>
		</div>
	);
}
 
export default UserCard;