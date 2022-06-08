import { ALERT_TYPES } from "./alertActions";
import { getDataApi } from "../../utils/fetchDataApi";
import { imageUpload } from "../../utils/imageUpload";

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

export const updateProfile = ({editData, avatar, wallpaper}) => async (dispatch) => { 
	if(!editData.fullname) return dispatch({type: 'ALERT', payload: {error:'Add you fullname'}})

	try {
		let mediaAvatar;
		let mediaWallpaper;

		dispatch({type:"Alert", payload : {loading:true}})
		if(avatar) mediaAvatar = await imageUpload([avatar]);
		dispatch({type:"Alert", payload : {loading:false}})

		dispatch({type:"Alert", payload : {loading:true}})
		if(wallpaper) mediaWallpaper = await imageUpload([wallpaper]);
		dispatch({type:"Alert", payload : {loading:false}})

	} catch (err) {
		dispatch({
			type: 'ALERT',
			payload: {
				error: err.response.data.msg,
			}
		})
	}

}