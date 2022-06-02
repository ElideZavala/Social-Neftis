import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

const EditProfile = ({user, setOnEdit}) => {

	const { auth } = useSelector(state => state);
	
	const initState = {
		story: '',
		phone: '',
		fullname: '',
		website: '',
		address: '',
	}

	const [ editData, setEditData ] = useState(initState);
	const { story, phone, fullname, website, address } = editData;
	const [ avatar, setAvatar ] = useState('')
	// Why you need here is i will be come back note to me.
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

				<label htmlFor='address'>Address</label>
				<div className='editProfile__userdata--address'>
					<input type='text' value={address} onChange={handleChangeInput} name='address' placeholder='Type your Address' />
				</div>

				<label htmlFor='website'>website</label>
				<div className='editProfile__userdata--website'>
 					<input type='text' value={website} onChange={handleChangeInput} name='website' placeholder='Type your website' />
				</div>

				<label htmlFor='phone'>Phone</label>
				<div className='editProfile__userdata--phone'>
					<input type='text' value={phone} onChange={handleChangeInput} name='phone' placeholder='Type your phone number' />
				</div>
				
				<label htmlFor='story'>Story</label>
				<div className='editProfile__userdata--story'>
					<input type='text' value={story} onChange={handleChangeInput} name='story' placeholder='Type your Bio' />
					<small>{story.length}/200</small>
				</div>
			</div>
		</div>
	 );
}
 
export default EditProfile;