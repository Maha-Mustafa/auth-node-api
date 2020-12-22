const express = require('express');
const authRoutes = require('./routes/auth');
const blogRoute = require('./routes/blog');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const app = express();
dotenv.config();
//connect to database
mongoose.connect('mongodb+srv://auth-app:hippy_unicorn@auth-app.jq2pz.mongodb.net/users?retryWrites=true&w=majority',
{ useUnifiedTopology: true, useNewUrlParser: true },
()=> console.log('connected to db'));
//middleware
app.use(express.json());
//routes middlewares
app.use('/api/user', authRoutes);
app.use('/api/blogs', blogRoute);
app.listen(3000, ()=> console.log('server up & running'));