import { postDataApi } from '../../utils/fetchDataApi';
import { ALERT_TYPES } from "./alertActions";

export const TYPES = {
	AUTH : 'AUTH'
}

export const login = (data) => async (dispatch) => {
	try {
		dispatch({
			type: ALERT_TYPES.ALERT,
			payload: {
				loading: true,
			}
		})
		const res = await postDataApi('login', data);
		console.log(data);
		dispatch({
			type: 'AUTH',
			payload: {
				token: res.data.accessToken,
				user: res.data.user,
			} 
		})
		
		dispatch({
			type: ALERT_TYPES.ALERT,
			payload: {
				success:res.data.msg,
			}
		})
	} catch (error) {
		console.log(error.response.data.msg)
		dispatch({
			type: ALERT_TYPES.ALERT,
			payload: {
				error:error.response.data.msg,
			}
		})
	}
}

export const refreshToken = () => async( dispatch ) => {
	const login = localStorage.getItem('login')
	if(login){
		dispatch({
			type: 'ALERT',
			payload: {
				loading: true,
			}
		})

		try {
			const res = await postDataApi('refresh_token')
			dispatch({
				type: 'AUTH',
				payload: {
					token: res.data.accessToken,
					user: res.data.user,
				}
			})

			dispatch({
				type: ALERT_TYPES.ALERT,
				payload: {
					success:res.data.msg,
				}
			})
		} catch (error) {
			dispatch({
				type: 'ALERT',
				payload: {
					error:error.response.data.msg
				}
			})
		}
	}
}

export const register = (data) => async (dispatch) => {
	try {
		console.log(data)
	} catch (error) {
		dispatch({
			type: 'ALERT',
			payload: {
				error: error.response.data.msg
			}
		})
	}
}