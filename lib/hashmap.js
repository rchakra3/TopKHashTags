function LinkedHashMap(max_size){

    this.map = {};
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
			this.head.next.prev=this.head;
		}

		this.map[new_key]=entry;
        //this.map.set(new_key,entry);
		this.length+=1;
		this.head.prev=entry;

		if(this.length > this.max_len){
			//console.log('Deleting key:'+this.tail.key);
            delete this.map[this.tail.key];
            //this.map.delete(this.tail.key);
			this.tail = this.tail.prev;
			this.length-=1;
		}
	},

	get: function(lookup_key){
		return (this.map[lookup_key] || {value:null});
	},

	remove_key: function(lookup_key){

		var entry = this.map[lookup_key];

        if(entry.next!==null){ 
		    entry.next.prev=entry.prev;
        }
        else{//this means it is the first element to be inserted. It is the tail
            this.tail=entry.prev;
        }
            
        if(entry.prev!==null){
            entry.prev.next=entry.next;
        }
        else{ //this means it is the last element to be inserted
            this.head=entry.next;
        }
		delete this.map[lookup_key];
	}
}
module.exports=LinkedHashMap;