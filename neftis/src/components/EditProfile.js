import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

const EditProfile = ({user, setOnEdit}) => {

	const { auth } = useSelector(state => state);
	
	const initState = {
		story: '',
		gender: '',
		phone: '',
		fullname: '',
		website: '',
		adress: '',
	}

	const [ editData, setEditData ] = useState(initState);
	const { story, gender, phone, fullname, website, adress } = editData;
	const [ avatar, setAvatar ] = useState('')
	const [ wallpaper, setWallpaper ] = useState('')	

	const changeAvatar = () => {

	}

	const changeWallpaper = () => {

	}

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setEditData({...editData, [name]:value})
	} 

	console.log(editData)

	return ( 
		<div className='editProfile'>
			<div className='editProfile__head'>
				<h4 className='editProfile__head--title'>
					Edit Your Profile
				</h4>
				<button className='editProfile__head--close' onClick={() => setOnEdit(false)}>
					Close
				</button>
			</div>
			{/* Cambiar nuestro Avatar y Wallpaper /Imagen de perfil */}
			<div className='editProfile__avatar'>
				<img src={wallpaper ? URL.createObjectURL(wallpaper) : auth.user.wallpaper} alt='wallpaper' />
				<span>
					<input type='file' id='file-upload' accept='image/*' onChange={changeWallpaper} />
				</span>
			</div>
			<div className='editProfile__avatar'>
				<img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt='avatar' />
				<span>
					<input type='file' id='file-upload' accept='image/*' onChange={changeAvatar} />
				</span>
			</div>
			<div className='editProfile__userdata'>
				<label htmlFor='fullname'>Fullname</label>
				<div className='editProfile__userdata--fullname'>
					<input type='text' value={fullname} onChange={handleChangeInput} name='fullname' placeholder='Type your name' />
					<small>{fullname.length}/25</small>

				</div>
			</div>
		</div>
	 );
}
 
export default EditProfile;