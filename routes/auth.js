const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//import validations
const {registerValidation, loginValidation} = require('../validation');
router.post('/register',async(req,res)=>{
    // res.send('register');
    //validate data before creating user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    //checking if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        // res.send(savedUser); instead of sending everything 
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});
//login
router.post('/login', async (req, res) => {
    //validate data 
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //checking if the user is already in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');
    //checking for valid password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    //create and access token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    //add header
    res.header('auth-token', token).send(token);
    // res.send('logged in');
});
module.exports = router;