import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

export const Header = () => {
	return ( 
		<div className="header">
			<div className="header__right">

			</div>
			<div className="header__center">
				<input type="text" placeholder="Search Profiles"/>

			</div>
			<div className="header__left">
				<IconButton>
					<HomeIcon/>
				</IconButton>
			</div>
		</div>
	 )
}

export default Header;