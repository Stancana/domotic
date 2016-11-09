var exports = {
    MONGO_URL : "mongodb://localhost:27017",
    MONGO_URL_PROD : "mongodb://mongo:27017",
    MONGO_LOGIN : "",
    MONGO_PASSWORD : "",
    MONGO_DBNAME : "fablab"
}

var setDBConfig = function(app){
    //Manage connection
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;

    var db = mongoose.connection;

    db.on('connecting', function() {
        console.log('connecting to MongoDB...');
    });

    db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function() {
        console.log('MongoDB connected!');
    });
    db.once('open', function() {
        console.log('MongoDB connection opened!');
    });
    db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });
    db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        setTimeout(function(){
            if(process.env.MODE == "PROD"){
                mongoose.connect(exports.MONGO_URL_PROD + '/' + exports.MONGO_DBNAME, {server:{auto_reconnect:true}});
            }else{
                mongoose.connect(exports.MONGO_URL + '/' + exports.MONGO_DBNAME, {server:{auto_reconnect:true}});
            }
        },5000);

    });
    if(process.env.MODE == "PROD"){
        mongoose.connect(exports.MONGO_URL_PROD + '/' + exports.MONGO_DBNAME, {server:{auto_reconnect:true}});
    }else{
        mongoose.connect(exports.MONGO_URL + '/' + exports.MONGO_DBNAME, {server:{auto_reconnect:true}});
    }
}

module.exports = {
    setDBConfig : setDBConfig,
    mongo_config: exports
}
