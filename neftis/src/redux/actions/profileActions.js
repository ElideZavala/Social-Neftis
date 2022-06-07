import { ALERT_TYPES } from "./alertActions";
import { getDataApi } from "../../utils/fetchDataApi";

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
	console.log({editData, avatar, wallpaper});
}