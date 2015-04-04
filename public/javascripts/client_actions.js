document.addEventListener('DOMContentLoaded',function(){

	var socket=io();
	var dropdown_node=document.getElementById('time_dropdown');

	dropdown_node.addEventListener('change',function(){
		var time_selected=this.value;
		console.log('Changed the value')
		
		socket.emit('Changed_Value',time_selected);

	})

	socket.on('Update_top_k',function(new_tags){

		var display_table=document.getElementById('topk-table-display');

		while(display_table.firstChild){
			display_table.removeChild(display_table.firstChild);
		}

		for(var iter in new_tags){
			var new_row=document.createElement('tr');
			var new_td=document.createElement('td');
			var text_val=document.createTextNode(new_tags[iter]);
			new_td.appendChild(text_val);
			new_row.appendChild(new_td);
			display_table.appendChild(new_row);
		}
	})


});