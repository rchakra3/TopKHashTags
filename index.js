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

var tweet_array=[];

console.log(my_linked_map.max_len)

twitter_stream.on('tweet',function(tweet){
	if(tweet.entities.hashtags.length>0 && tweet.user.lang==='en'){
		/*tweet.entities.hashtags.forEach(function(hashtag){

			var count=my_linked_map.get(hashtag.text).value;

			if(count===null){
				//console.log('new value:'+hashtag.text);
				my_linked_map.put(hashtag.text,1);
			}
			else{
				my_linked_map.put(hashtag.text,count+1);
			}

		})*/

		tweet_array.push(tweet.entities.hashtags);
		//console.log(tweet_array);
		if(tweet_array.length>1000){
			tweet_array.shift();
		}

	}
		
})


var print_map_id=setInterval(function(){


	tweet_array.forEach(function(entry){

		entry.forEach(function(hashtag){

			var count=my_linked_map.get(hashtag.text).value;

			if(count===null){
					//console.log('new value:'+hashtag.text);
				my_linked_map.put(hashtag.text,1);
			}
			else{
				my_linked_map.put(hashtag.text,count+1);
			}
			
	})
	});

	var freq_array=[];

	for(var entry in my_linked_map.map){
		freq_array.push([my_linked_map.map[entry].value,entry])
		//console.log(entry+':'+my_linked_map.map[entry].value);
	}

	freq_array.sort(function(a,b){
		if(a[0]<b[0])
			return 1;
		else if(a[0]>b[0])
			return -1

		return 0;
	})

	var counter=0;

	for(var i=0;i<10;i++)
		console.log(freq_array[i]);
	


},5000);
