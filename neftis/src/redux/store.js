import { createStore, applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkitx";
import thunk  from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';
import { Provider } from "react-redux";

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
)

const DataProvider = ({children}) => {
	return (
		<Provider store={ store }>
			{children}
		</Provider>
	)
}

export default DataProvider;