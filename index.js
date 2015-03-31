var express = require('express');
var Twit = require('twit')
var hashMap = require('./lib/hashmap.js');
var app=express();


var twitconfig=require('./lib/config.js');
var T=new Twit(twitconfig);



app.get('/',function(request,response){

	response.send("Welcome!");
});

var server = app.listen(3000,function(){
	var port=server.address().port;
	console.log('App listening at port %s',port);
});

var twitter_stream=T.stream('statuses/sample');

var my_linked_map=new hashMap(200);

console.log(my_linked_map.max_len)

twitter_stream.on('tweet',function(tweet){
	if(tweet.entities.hashtags.length>0 && tweet.user.lang==='en')
		tweet.entities.hashtags.forEach(function(hashtag){
			//console.log(hashtag.text)

			var count=my_linked_map.get(hashtag.text).value;

			if(count===null){
				//console.log('new value:'+hashtag.text);
				my_linked_map.put(hashtag.text,1);
			}
			else{
				my_linked_map.put(hashtag.text,count+1);
			}

		})
		
})


var print_map_id=setInterval(function(){

	for(var entry in my_linked_map.map){
		console.log(entry+':'+my_linked_map.map[entry].value);
	}
},5000);
