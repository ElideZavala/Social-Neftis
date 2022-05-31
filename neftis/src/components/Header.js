import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import { getDataApi } from '../utils/fetchDataApi';
import SearchLoading from "./SearchLoading";


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
	const { auth } = useSelector(state => state);
	const { pathname } = useLocation(); // Estraemos pathname del objeto traido por useLocation. 
	const [load, setLoad] = useState(false);

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

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!search) return;

		try {
			setLoad(true);
			const res = await getDataApi(`search?username=${search}`, auth.token);
			setUsers(res.data.users)
			setLoad(false)
		} catch (err) {
			dispatch({
				type: 'ALERT',
				payload: {
					error: err.response.data.msg
				}
			})
		}
	}

	/* DOM Header */
	return ( 
		<div className="header">
			<div className="header__right">
				<h3 className="header__right--networks">Social Neftis</h3>
			</div>

			<form className="header__center" onSubmit={handleSearch}>
				<input type="text" placeholder="Search Profiles" value={search} onChange={(e)=>setSearch(e.target.value)}/>
				<IconButton>
					<SearchIcon style={{opacity: users.length > 0 ? '0' : '1'}} />
					<span className="header__center--close" onClick={handleClose} style={{opacity: users.length > 0 ? '1' : '0'}}>&times;</span>
				</IconButton>
				<button type="submit" className="header__center--button">Search</button>

				{/* Seccion de busqueda por fullname */}
				<div className="header__center--searchers">
					{load && <SearchLoading/> }
					{
						search && users.length > 0 && users.map(user => (
							<UserCard user={user} key={user._id} handleClose={handleClose}/>
						)) 
					}
				</div>
			</form>

			<div className="header__left">
				<Link to={`profile/${auth.user._id}`} className="header__left--avatar" > 
						<div className="header__left--avatar">
						<Avatar src={auth.user.avatar}/>
						<h3 className="header__left--avatar__user">{auth.user.fullname}</h3>
						</div>	
				</Link>
				
				<Link to="/">
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
			</div>
		</div>
	 )
}

export default Header;
