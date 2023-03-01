const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/database/db');
require('dotenv').config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(require('./src/routes/auth.routes.js'));
app.use(require('./src/routes/user.routes'));
app.use(require('./src/routes/admin.routes'));


app.listen(3000, ()=>console.log('Servidor corriendo'));