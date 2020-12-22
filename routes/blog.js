const router = require('express').Router();
const User = require('../models/User');
const verify = require('./validation');
router.get('/', verify ,(req,res)=>{
    // res.json({
    //     posts:{
    //         title: 'welcome to my blog',
    //         description: 'lets learn together'
    //     }
    // });
    //accessing the user 
    res.send(req.user);
    //find the user based on token
    // User.findOne({_id:req.user})
});
module.exports = router;