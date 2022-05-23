import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home"
import ExploreIcon from "@material-ui/icons/Explore"
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { Link } from 'react-router-dom';

export const Header = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state);

	return ( 
		<div className="header">
			<div className="header__right">
				<h3 className="header__right--fullname">Social Notices</h3>
			</div>
			<div className="header__center">
				<input type="text" placeholder="Search Profiles"/>
				<IconButton>
					<SearchIcon/>
				</IconButton>

			</div>
			<nav className="header__left">
				<div className="header__left--avatar">
						<Avatar src={auth.user.avatar}/>
						<h3  className="header__left--avatar__user">{auth.user.fullname}</h3>
				</div>	
				
				<Link to="/">
				<IconButton>
					<HomeIcon/>
				</IconButton>
				</Link>
				<Link to="/message">
				<IconButton>
					<MessageIcon/>
				</IconButton>
				</Link>
				<Link to="/notification">
				<IconButton>
					<NotificationsIcon/>
				</IconButton>
				</Link>
				<Link to="/explore">
				<IconButton>
					<ExploreIcon/>
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
