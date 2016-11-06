var exports = {
    MONGO_URL : "mongodb://mongodb:27017",
    MONGO_LOGIN : "",
    MONGO_PASSWORD : "",
    MONGO_DBNAME : "fablab"
}

var setDBConfig = function(app){
    //Manage connection
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect(exports.MONGO_URL + '/' + exports.MONGO_DBNAME);
    var db = mongoose.connection;
    db.on('error', function () {
        console.log('Connection to dabatase FAILED');
    });
    db.on('open', function () {
        console.log('Connection to dabatase SUCCESS.')
    });
}

module.exports = {
    setDBConfig : setDBConfig,
    mongo_config: exports
}
