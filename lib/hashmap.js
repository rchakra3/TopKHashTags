function LinkedHashMap(max_size){

    this.map = new Map();
	this.head= null;
	this.tail= null;
	this.length= 0;
	this.max_len=max_size;

};


LinkedHashMap.prototype={

	put: function(new_key,new_value){
		
        var entry={
			key : new_key,
			value : new_value,
			next : this.head,
			prev : null,
		};
        
        if(this.length===0){
			this.head=entry;
			this.tail=entry;
		}

		else{
			this.head=entry;
		}
        
		this.map[new_key]=entry;
        //this.map.set(new_key,entry);
		this.length+=1;
		this.head.prev=entry;

		if(this.length > this.max_len){
            delete this.map[this.tail.key];
            //this.map.delete(this.tail.key);
			this.tail = this.tail.prev;
			this.length-=1;
		}

	},

	get: function(lookup_key){
		return (this.map[lookup_key] || {});
	}

}
