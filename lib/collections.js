Devices = new Mongo.Collection("devices");
Songs = new Mongo.Collection("songs");

Devices.allow({
	insert:function(userId, doc){
		return true;
	},
	update:function(userId, doc){
		return true;
	},
	remove:function(userId, doc){
		return true;
	}
});