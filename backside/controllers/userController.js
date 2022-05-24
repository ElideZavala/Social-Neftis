const Users = require("../models/userModel");

const userController = {
	searchUser: async (req, res) => {
		try {
			const users = Users.find({username: {$regex: req.query.username}}).limit(10).select("").select("fullname username avatar")

			res.json({users})
		} catch (err) {
			return res.status(500).json({err: err.message})			
		}
	}
 }

 module.exports = userController;