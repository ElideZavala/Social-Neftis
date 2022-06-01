import React, { useEffect, useState } from 'react';

const EditProfile = ({user, setOnEdit}) => {
	
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
	const [avatar, setAvatar] = useState('')

	return ( 
		<div className='editProfile'>
			<div className='editProfile__head'>
				<h4 className='editProfile__head--title'>
					Edit Your Profile
				</h4>
				<button className='editProfile__head--close' onClick={()=> setOnEdit(false)}>
					Close
				</button>
			</div>
		</div>
	 );
}
 
export default EditProfile;