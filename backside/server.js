require('dotenv').config(); // Requerimos la configuracion de las variables de entorno. 
const express = require('express');
const mongoose = require('mongoose'); // Requeriremos de nuetra base de datos. 
const cors = require('cors'); // Acceso a recursos seleccionados de un origen diferente.
const cookieparser = require('cookie-parser');
const authRouter = require('./routers/authRouter')

const app = express();

app.use(express.json()); // Esto sera para el body parsing...
app.use(cors());
app.use(cookieparser()); // Tube un error con ()

// routes
app.use('/api', authRouter)

// Now Open Postman . ... .. 

// Establecemos puertos.
app.set('port', process.env.PORT || 5000);
const URL = process.env.MONGO_URI;

// Mongoose, Logramos la connection.
mongoose.connect(URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, err => {
	if (err) throw err;
	console.log('db is connected')
} )

app.listen(app.get('port'));
console.log('Server on port, App is running', app.get('port'));