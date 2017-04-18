var express = require('express');
var router = express.Router();

var users = require("../users.json");

/* GET users listing. */
router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//	res.render('users/index',{title:'Users',users:users});
	
	res.send({title:'Users',users:users});
});

router.get('/new',function(req,res){
	res.render('users/new',{title:'New User'});
});
/*
router.get('/:name',function(req,res,next){
	 var user  = users[req.params.name];
	if(user){
		res.render("users/profile",{title:'User Profile',user:user});
	}else{
		next();
	} 
});*/
router.get('/:id',function(req,res,next){
	var user = users['user'+req.params.id];
	if(user){
		res.send({title:'UserProfile',user,user});
	}else{
		res.send({message:'User not present'});
	}
});

router.post("/addUser",function(req,res,next){
	/* if(users[req.body.name]){
		res.send('Conflict',409);
	}else{
		users[req.body.name] = req.body;
		res.redirect('/users/');
	} */
	var body = '';
	req.on('data',function(data){
		body+=data;
	});
	req.on('end',function(){
		var json = JSON.parse(body);
		users['user'+json.id] = body;
		res.send({message:'User Added'})
	});
});
module.exports = router;
