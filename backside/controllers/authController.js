const Users = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
	register: async (req, res) => {
		try {
			const {fullname, username, email, password, gender} = req.body;

			const newUsername = username.toLowerCase().replace(/ /g,'' ); 
			const userName = await Users.findOne({username: newUsername}) // Buscar y encontrar
			if (userName) return res.status(400).json({msg: 'this username already exists'});

			const Email = await Users.findOne({ email })
			if(Email) return res.status(400).json({msg: 'this email already exists'});

			if(password.length < 6) return res.status(400).json({msg: "password must be atleast 6 characters long"});

			const passwordHash = await bcrypt.hash(password, 13);  // hash de seguriadad de 13 digitos. 
			
			const newUser = new Users({
				fullname, 
				username: newUsername, 
				email, 
				password: passwordHash, 
				gender,
			});

			const accessToken = createAccessToken({id: newser._id}) 
			const refreshToken = createrRefreshToken({id: newser._id}) 

			// Creamos los cookie con nuestro token.
			res.cookie('refreshtoken', refreshToken, {
				httpOnly: true,
				path: "/api/refresh_token", // Direccion de nuestro Cookie
				maxAge: 24*30*60*60*1000 // Duracion de cookie. ==> 30 Days. 
			})
			
			// Guardamos el nuevo Usuario. 
			await newUser.save();

			res.json({
				msg: "registerd success",
				accessToken,
				user:{  
					...newUser._doc, // Nuestro usuario, sin nuestra contraseña
					password:''
				}
			})
		} catch (err) {
			res.status(500).json({
				msg: err.message
			})
		}
	},
	login: async (req, res) => {
		try {
			const {email, password } = req.body;

			// Buscamos el usuario con este email mas friends, followind menos la contraseña.
			const user = await Users.findOne({email})
			.populate("friends following", "-password")

			if(!user) return res.status(400).json({
				msg: 'User does not exists',
			})

			// Comparamos es password escrito por el Passerd encontrado. 
			const isMatch = await bcrypt.compare(password, user.password); // true o false

			// En caso de pasar una contraseña diferente
			if(!isMatch) return res.status(400).json({
				msg: 'User Password is incorrect',
			})

			const accessToken = createAccessToken({id: user._id}) 
			const refreshToken = createrRefreshToken({id: user._id}) 

			// Creamos los cookie con nuestro token.
			res.cookie('refreshtoken', refreshToken, {
				httpOnly: true,
				path: "/api/refresh_token", // Direccion de nuestro Cookie
				maxAge: 24*30*60*60*1000 // Duracion de cookie. ==> 30 Days. 
			})

			res.json({
				msg: "login success",
				accessToken,
				user:{  
					...user._doc, // Nuestro usuario, sin nuestra contraseña
					password:''
				}
			})

		} catch (err) {
			res.status(500).json({
				msg: err.message
			})
		}
	},
	logout: async (req, res) => {
		try {
			// Limpiar nuestro token al dejar nuestra pogina. 
			res.clearCookie('refreshtoken', {path: "/api/refresh_token"});
			res.json({msg: "Logged out"})
		} catch (err) {
			res.status(500).json({
				msg: err.message
			})
		}
	},
	generateAccessToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken;
			// Si no encotramos el token
			if(!rf_token) return res.status(400).json({msg: "please login now"});

			jwt.verify(rf_token, process.env.REFRESHTOKENSECRET, async(err, result) => {
				if(err) return es.status(400).json({msg:"Please login now"})

				// Traremos a nuestro usuario sin la contraseña mas los Amigos + seguidores. 
				const user = await Users.findById(result.id).select("-password").populate("friends following")

				if(!user) return res.status(400).json({msg: "user does not exist"})

				// Creamos nuestro acceso con el ID. 
				const accessToken = createAccessToken({id: result.id })
				
				res.status(200).json({
					accessToken,
					user
				})
			})
		} catch (err) {
			res.status(500).json({
				msg: err.message
			})
		}
	} 
}

// Creamos el nuevo toke con la contrase
const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESSTOKENSECRET, {expiresIn: "1d"})
}

// Expiracion del token
const createrRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESHTOKENSECRET, {expiresIn: "30d"})
}

module.exports = authController;