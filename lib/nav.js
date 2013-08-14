var mongo = require('mongoose')
  , cfg = require('./../config/config')
  , Schema = mongo.Schema;

var NavPlace =  new Schema({
    title:    String,
    location: String, 
    nav_home: String,
    order:    String
});

var Navi = mongo.model('navigations', NavPlace);

function open() {
	mongo.connect('mongodb://' + cfg.mongo_host + ':' + cfg.mongo_port + '/navigation');
	var db = mongo.connection;
	db.on('error', console.error.bind(console, 'connection error: '));

  return db;
}

function list(item, cb) {
	var db = open();
  
	db.once('open', function () {    
		Navi.find({nav_home:item}, cb);
	});
}

module.exports.navList = function (item, cb) {
  list(item, function(err, data) {
		mongo.disconnect();
		if (err) {
			cb(err, null);
		} else if (data) {
      cb(null, data);
    }
	});
};