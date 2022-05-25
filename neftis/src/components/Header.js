import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import { getDataApi } from '../utils/fetchDataApi';

/* Icons of Material UI */
import { Avatar } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home"
import ExploreIcon from "@material-ui/icons/Explore"
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAAppIcon from "@material-ui/icons/ExitToApp";
import UserCard from "./UserCard";

/* Header */
export const Header = () => {
	const [ search, setSearch ] = useState('');
	const [ users, setUsers ] = useState([]);
	const dispatch = useDispatch();
	const { auth } = useSelector(state=>state);
	const { pathname } = useLocation(); // Estraemos pathname del objeto traido por useLocation. 

	/* Busqueda al momento */
	useEffect(() =>{
		if(search && auth.token) {
			getDataApi(`search?username=${search}`, auth.token)
			.then(res => setUsers(res.data.users))
			.catch(err => {
				dispatch({
					type: 'ALERT',
					payload: {
						error: err.response.data.msg
					}
				})
			})
		} else {
			setUsers([])
		}
	},[search, auth.token, dispatch]);

	const isActive = (pn) => {
		if(pn === pathname) return 'header__active'
	}

	const handleClose = () => {
		setSearch('');
		setUsers([]);
	}

	/* DOM Header */
	return ( 
		<div className="header">
			<div className="header__right">
				<h3 className="header__right--networks">Social Networks</h3>
			</div>

			<form className="header__center">
				<input type="text" placeholder="Search Profiles" value={ search } onChange={(e)=>setSearch(e.target.value)}/>

				<IconButton>
					<SearchIcon style={{opacity: users.length > 0 ? '0' : '1'}} />
					<span className="header__center--close" onClick={handleClose} style={{opacity: users.length > 0 ? '1' : '0'}}>&times;</span>
				</IconButton>

				{/* Seccion de busqueda por fullname */}
				<div className="header__center--searchers">
					{
						search && users.length > 0 && users.map(user => (
							<Link to={`profile/${user._id}`} key={user._id}>
								<UserCard user={user}/>
							</Link>
						)) 
					}
				</div>
			</form>

			<nav className="header__left">
				<Link to={`profile/${auth.user._id}`} className="header__left--avatar" > 
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
