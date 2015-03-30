var express = require('express');
var Twit = require('twit')
var hashMap = require('./lib/hashmap.js');
var app=express();


var twitconfig=require('./node_modules/twit/config.js');
var T=new Twit(twitconfig);



app.get('/',function(request,response){

	response.send("Welcome!");
});

var server = app.listen(3000,function(){
	var port=server.address().port;
	console.log('App listening at port %s',port);
});

var twitter_stream=T.stream('statuses/sample');

twitter_stream.on('tweet',function(tweet){
	if(tweet.entities.hashtags.length>0 && tweet.user.lang==='en')
		tweet.entities.hashtags.forEach(function(hashtag){
			console.log(hashtag.text)
		})
		
})
