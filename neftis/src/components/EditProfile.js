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
			{/* Cambiar nuestro Avatar/Imagen de perfil */}
			<div className='editProfile__avatar'>
				<img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt='avatar' />
				<span>
					<input type='file' id='file-upload' accept='image/*' onChange={changeAvatar} />
				</span>
			</div>
			<div className='editProfile__userdata'>

			</div>
		</div>
	 );
}
 
export default EditProfile;