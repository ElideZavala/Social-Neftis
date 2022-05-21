const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		trim: true, // Eliminar los espacios en blanco.  
		unique: true,
		maxlength: 25,  // Numero maximo
		required: true
	},
	fullname: {
		type: String,
		trim: true,
		required: true,
		maxlength: 25,  // Numero maximo
	},
	email: {
		type: String,
		trim: true, // Eliminar los espacios en blanco
		required: true
	},
	password: {
		type: String,
		required: true
	},
	address: {  
		type: String,
		default: ''  // Si no se proporciona valor este sera nulo. 
	},
	gender: {
		type: String,
		default: 'other'
	},
	website: {
		type: String,
		default: ''
	},
	phone: {
		type: String,
		default: ''
	}, 
	avatar: {
		type: String,
		default: ''
	},
	story: {
		type: String,
		default: '',
		maxlength: 200, 
	},
	friends: [{
		// Hacemos referencias al Id del Usuario Amigo.
		type:mongoose.Types.ObjectId, ref:'User' 
	}],
	following: [{
		type:mongoose.Types.ObjectId, ref:'User'
	}]
}, {
	timestamps: true // Preservar el orden dentro del motor de alamacenamiento. 
})

module.exports = mongoose.model('User', userSchema);