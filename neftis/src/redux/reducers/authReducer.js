 import { TYPES } from "../actions/authActions";

const initialState = {
	// login: true
};

 const authReducer = (state=initialState, action) => {
	 switch(action.type) {
		case TYPES.AUTH:
			return action.payload
		default:
			return state
	 }
	}
	
	export default authReducer;