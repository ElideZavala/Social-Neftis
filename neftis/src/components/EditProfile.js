import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../utils/imageupload";

/* images */
// import perfile from '../images/avatar/perfile.png'
// import img from '../images/avatar/gradiente.png'

const EditProfile = ({user, setOnEdit}) => {

	const { auth } = useSelector(state => state);
	const dispatch = useDispatch();
	
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
	const [ wallpaper, setWallpaper ] = useState('')	
	// Why you need here is i will be come back note to me.

	const changeAvatar = (e) => {
		const file = e.target.files[0];
		const err = checkImage(file)
		if(err) return dispatch({type:"ALERT", payload:{error: err}})
		setAvatar(file);
	}

	useEffect(() => {
		setEditData(user)
	}, [user])

	const changeWallpaper = (e) => {
		const file = e.target.files[0];
		console.log(file)
		setWallpaper(file);
	}

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setEditData({...editData, [name]:value})
	} 

	const selectUploadAvatar = () => {
		const fileUploadInput = document.getElementById('file-uploadAvatar');
		fileUploadInput.click();
	}

	const selectUploadWallpaper = () => {
		const fileUploadInput = document.getElementById('file-uploadWallpaper');
		fileUploadInput.click();
	}

	return ( 
		<div className='editProfile'>
			<div className='editProfile__head'>
				<h4 className='editProfile__head--title'>
					Edit Your Profile
				</h4>
				<button className='editProfile__head--close' onClick={() => setOnEdit(false)}>
					x
				</button>
			</div>
			{/* Cambiar nuestro Avatar y Wallpaper /Imagen de perfil */}
			<div className='editProfile__image'>
				<div className='editProfile__image--wallpaper'>
					<img src={wallpaper ? URL.createObjectURL(wallpaper) : auth.user.wallpaper} alt='wallpaper' />
					{/* <img src={img} alt='wallpaper' /> */}
					<i className='fas fa-camera' onClick={selectUploadWallpaper}></i>
					<span>
						<input type='file' id='file-uploadWallpaper' accept='image/*' onChange={changeWallpaper} />
					</span>
				</div>
				<div className='editProfile__image--avatar'>
					<img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt='avatar' />
					{/* <img src={perfile} alt='avatar' /> */}
					<i className='fas fa-camera' onClick={selectUploadAvatar}></i>
					<span>
						<input type='file' id='file-uploadAvatar' accept='image/*' onChange={changeAvatar} />
					</span>
				</div>
			</div>
			{/* Cambiar los demas elementos */}
			<div className='editProfile__userdata'>
				<label htmlFor='fullname'>Fullname</label>
				<div className='editProfile__userdata--fullname'>
					<input type='text' maxlength='25' value={fullname} onChange={handleChangeInput} name='fullname' placeholder='Type your name' />
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
					<textarea type='text' maxlength='200' cols="25" rows='4' wrap='hard' placeholder='Write Your Bio'value={story} onChange={handleChangeInput} name='story' />
					<small>{story.length}/200</small>
				</div>
			</div>
		</div>
	 );
}
 
export default EditProfile;