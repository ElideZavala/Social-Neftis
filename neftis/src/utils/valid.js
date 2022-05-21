const valid = ({fullname, username, email, password, confirmPassword}) => {
	const err = {}

	if (!fullname) {
		err.fullname = 'Please add you fullname'
	} else if (fullname.length > 25) {
		err.fullname = 'length should be less that 25 characters'
	} else if (fullname.length < 2) {
		err.fullname = 'length should have most of 2 characters'
	}

	if (!username) {
		err.username = 'Please add you name'
	} else if (username.replace(/ /g,' ').length > 25) {
		err.username = 'length should be less that 25 characters'
	}

	if (!email) {
		err.email = 'Please add you email'
	} else if (!validateEmail(email)) {
		err.email = 'Invalid Email format' 
	}

	if (!password) {
		err.password = 'Please add your password'
	} else if (password.length < 6) {
		err.password = 'length should have more that 6 characters'
	}

	if (password !== confirmPassword) {
		err.confirmPassword = 'Password should be march'
	}

	return {
		errMsg: err,
		errLength: Object.keys(err).length // Obtener la cantidad de errores 
	}
}


function validateEmail(email) {
	// eslint-disable-next-line
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
	// Obtendremos un true si esta bien el email. 
}

export default valid;