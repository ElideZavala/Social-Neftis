import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

/* Icons of Material UI */
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home"
import ExploreIcon from "@material-ui/icons/Explore"
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from '@material-ui/core';

/* Header */
export const Header = () => {
	const [ search, setSearch ] = useState('');
	const dispatch = useDispatch();
	const { auth } = useSelector(state=>state);
	const { pathname } = useLocation(); // Estraemos pathname del objeto traido por useLocation. 

	const isActive = (pn) => {
		if(pn === pathname) return 'header__active'
	}

	return ( 
		<div className="header">
			<div className="header__right">
				<h3 className="header__right--networks">Social Networks</h3>
			</div>

			<form className="header__center">
				<input type="text" placeholder="Search Profiles" value={ search } onChange={(e)=>setSearch(e.target.value)}/>

				<IconButton>
					<SearchIcon/>
				</IconButton>
			</form>

			<nav className="header__left">
				<Link className="header__left--avatar" to={`profile/${auth.user._id}`}> 
						<div className="header__left--avatar">
						<Avatar src={auth.user.avatar}/>
						<h3 className="header__left--avatar__user">{auth.user.fullname}</h3>
						</div>	
				<Link/>

				<IconButton>
					<HomeIcon className={`${isActive('/')}`}/>
				</IconButton>
				</Link>
				<Link to="/message">
				<IconButton>
					<MessageIcon className={`${isActive('/message')}`}/>
				</IconButton>
				</Link>
				<Link to="/notification">
				<IconButton>
					<NotificationsIcon className={`${isActive('/notification')}`}/>
				</IconButton>
				</Link>
				<Link to="/explore">
				<IconButton>
					<ExploreIcon className={`${isActive('/explore')}`}/>
				</IconButton>
				</Link>

				<IconButton onClick={()=> dispatch(logout())}>
					<ExitToAAppIcon/>
				</IconButton>
			</nav>
		</div>
	 )
}

export default Header;
