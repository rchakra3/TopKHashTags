var express = require('express');
var Twit = require('twit')
var hashMap = require('./lib/hashmap.js');
var app=express();
var path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

var twitconfig=require('./lib/config.js');
var T=new Twit(twitconfig);

app.get('/',function(request,response){

	 response.render('index', { title: 'Express' });
});

var server = app.listen(3000,function(){
	var port=server.address().port;
	console.log('App listening at port %s',port);
});

var twitter_stream=T.stream('statuses/sample');

var tweet_window_size=100;

var my_linked_map=new hashMap();

var tweet_array=[];

var input_tto=0;
var output_tto=0;

twitter_stream.on('tweet',function(tweet){
	if(tweet.entities.hashtags.length>0 && tweet.lang==='en'){
		tweet_array.push(tweet.entities.hashtags);
		
		while(tweet_array.length>tweet_window_size){	
			var hashtags=tweet_array.shift();	
			hashtags.forEach(function(hashtag){
				var count=my_linked_map.get(hashtag.text).value;
				if(count!==null){
					count-=1;
					my_linked_map.put(hashtag.text,count);
				}
			})
		}
	}
})

var io= require('socket.io')(server);

var time_interval=5;

var k=10;


var print_map_function=function(socket){

	my_linked_map=new hashMap(tweet_window_size*3);

	tweet_array.forEach(function(entry){

		entry.forEach(function(hashtag){

			var count=my_linked_map.get(hashtag.text).value;

			if(count===null){
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
	}

	freq_array.sort(function(a,b){
		if(a[0]<b[0])
			return 1;
		else if(a[0]>b[0])
			return -1

		return 0;
	})

	var topk_obj={}

	for(var i=0;i<k;i++){
		console.log(freq_array[i]);
		topk_obj[i]=freq_array[i];
	}

	//console.log('Just before emit.')
	if(typeof socket !=='undefined'){
		socket.emit('Update_top_k',topk_obj)
	}

	console.log();

}

//var print_interval_id=setInterval(print_map_function,time_interval*1000);

io.on('connection',function(socket){

	socket.on('New_Update_Freq',function(changed_val){
		console.log('received changed_val');
		time_interval=parseInt(changed_val);
		clearInterval(print_interval_id);
		print_interval_id=setInterval(function(){print_map_function(socket)},time_interval*1000);
	});

	socket.on('New_k_val',function(new_k_val){
		k=parseInt(new_k_val);
	})

	socket.on('New_buffer_size',function(new_buffer_size){
		tweet_window_size=parseInt(new_buffer_size)
	})

	print_interval_id=setInterval(function(){print_map_function(socket)},time_interval*1000);


})




module.export = app;