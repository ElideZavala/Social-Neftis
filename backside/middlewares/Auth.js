const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization")
		console.log(token)

		if(!token) return res.status(500).json({msg: "Not Valid"}); 

		const decoded = jwt.verify(token, process.env.ACCESSTOKENSECRET);

		if(!decoded) return res.status(500).json({msg: "Not Valid"}); 

		const user = await Users.findOne({_id: decoded.id})

		res.user = user;
		// res.json = ({user}); 

		next();
		
	} catch (err) {
		return res.status(500).json({msg: err.message});

	}
}

module.exports = auth;