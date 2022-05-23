import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home"
import ExploreIcon from "@material-ui/icons/Explore"
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from '@material-ui/core';

export const Header = () => {
	return ( 
		<div className="header">
			<div className="header__right">
				<h3>Social Noticias</h3>
			</div>
			<div className="header__center">
				<input type="text" placeholder="Search Profiles"/>
				<IconButton>
					<SearchIcon/>
				</IconButton>

			</div>
			<nav className="header__left">
				<div className="header__left--avatar">
						<Avatar/>
						<h3>Sherlock</h3>
				</div>	

				<IconButton>
					<HomeIcon/>
				</IconButton>
				<IconButton>
					<MessageIcon/>
				</IconButton>
				<IconButton>
					<NotificationsIcon/>
				</IconButton>
				<IconButton>
					<ExploreIcon/>
				</IconButton>
				<IconButton>
					<ExitToAAppIcon/>
				</IconButton>
			</nav>
		</div>
	 )
}

export default Header;
