import { ALERT_TYPES } from "./alertActions";
import { getDataApi, patchDataApi } from "../../utils/fetchDataApi";
import { imageUpload } from "../../utils/imageUpload";
import axios from "axios";

export const PROFILE_TYPES = {
	LOADING : 'LOADING',
	GET_USER : 'GET_USER',
}

export const getProfileUsers = ({users, id, auth}) => async (dispatch) => {
	if(users.every(user => user.id !== id)) {
		try {
			dispatch({
				type: PROFILE_TYPES.LOADING, 
				payload: {loading:true}
			})

			const res = await getDataApi(`user/${id}`, auth.token);

			dispatch({
				type: PROFILE_TYPES.GET_USER,
				payload: res.data
			})
			dispatch({
				type: PROFILE_TYPES.LOADING, 
				payload: {loading:false}
			})

		} catch (err) {
			dispatch({
				type: 'ALERT',
				payload: {
					error: err.response.data.msg,
				}
			})
		} 
	}
}

export const updateProfile = ({editData, avatar, wallpaper, auth}) => async (dispatch) => { 
	if(!editData.fullname) return dispatch({type: 'ALERT', payload: {error:'Add you fullname'}})

	try {
		let mediaAvatar;
		let mediaWallpaper;

		dispatch({type:"ALERT", payload : {loading:true}})
		if(avatar) mediaAvatar = await imageUpload([avatar]);

		/* ------- Actualizar nuestros Datos ------- */
		const res = await axios.patch("http://localhost:5000/api/user", {
		// const res = await patchDataApi('user', { 
			...editData,
			avatar: avatar ? mediaAvatar[0].secure_url : auth.user.avatar,
			wallpaper: wallpaper ? mediaWallpaper[0].secure_url : auth.user.wallpaper,
		}, 
		{
			headers: { Authorization: auth.token }
		});
		console.log(res);
		

		/* ------- Guardar las Imagenes ------- */
		dispatch({type:"ALERT", payload : {loading:false}})
		console.log(mediaAvatar)

		dispatch({type:"ALERT", payload : {loading:true}})
		if(wallpaper) mediaWallpaper = await imageUpload([wallpaper]);
		dispatch({type:"ALERT", payload : {loading:false}})
		console.log(mediaWallpaper)

	} catch (err) {
		dispatch({
			type: 'ALERT',
			payload: {
				error: err.response.data.msg,
			}
		})
	}

}