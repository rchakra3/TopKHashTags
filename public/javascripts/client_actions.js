document.addEventListener('DOMContentLoaded',function(){

	var socket=io();
	var dropdown_node=document.getElementById('dropdownMenuList');

	/*dropdown_node.addEventListener('click',function(){
		var time_selected=this.text;
		console.log('Changed the value:'+time_selected)
		
		socket.emit('New_Update_Freq',time_selected);

	})*/
	$(".dropdown-menu li a").click( function() {
	    var time_selected = $(this).text();
	    console.log('Changed the value:'+time_selected)
	    $("#freq_text_area").val(time_selected)
	    //$("#freq_text_area").attr("placeholder",time_selected);
		socket.emit('New_Update_Freq',time_selected);
	});

	$("#buffer_size_button").click(function(){
		socket.emit('New_buffer_size', $("#buffer_size_text").val())
	});

	$("#k_button").click(function(){
		socket.emit('New_k_val',$("#k_text").val())
	})

	socket.on('Update_top_k',function(new_tags){

		var display_table=document.getElementById('topk-table-display');

		while(display_table.childNodes[0].lastChild && display_table.childNodes[0].lastChild.lastChild.tagName!=='TH'){
			display_table.childNodes[0].removeChild(display_table.childNodes[0].lastChild);
		}

		for(var iter in new_tags){
			var new_row=document.createElement('tr');

			//the hashtag column
			var new_hasht_td=document.createElement('td');
			var text_val=document.createTextNode(new_tags[iter][1]);
			new_hasht_td.appendChild(text_val);

			//the frequency column
			var new_freq_td=document.createElement('td');
			var text_val=document.createTextNode(new_tags[iter][0]);
			new_freq_td.appendChild(text_val);

			new_row.appendChild(new_hasht_td);
			new_row.appendChild(new_freq_td);
			display_table.childNodes[0].appendChild(new_row);
		}
	})


});