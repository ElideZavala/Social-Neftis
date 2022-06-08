const Users = require("../models/userModel");

const userController = {
	searchUser: async (req, res) => {
		try {
			const users = await Users.find({username: {$regex: req.query.username}}).limit(10).select("fullname username avatar")
			res.json({users})
		} catch (err) {
			return res.status(500).json({msg: err.message})			
		}
	},
	
	getUser: async (req, res) => {
		try {
			const user = await Users.findOne({_id: req.params.id }).select("-password")
			if(!user) return res.status(400).json({msg: 'No user Exists'})	
			res.json = ({user});
			
		} catch (err) {
			return res.status(500).json({msg: err.message})			
		}
	}, 
	updateUser: async (req, res) => {
 		try {
 			const { story, phone, fullname, website, address } = req.body;
			if(!fullname) return res.status(400).json({msg: 'Fullname is requires'})

			await Users.findOneAndUpdate({_id: req.user._id}, {
				story, phone, fullname, website, address 
			})

			res.json({ msg: 'update success' })
		} catch (error) {
			return res.status(500).json({msg: err.message})
		}
	}
 }

 module.exports = userController;