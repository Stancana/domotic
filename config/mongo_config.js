var MONGO_URL = "mongodb://localhost:27017";
var MONGO_LOGIN = "";
var MONGO_PASSWORD = "";
var MONGO_DBNAME = "fablab";

var setDBConfig = function(app){
    app.set("MONGO_URL", MONGO_URL);
    app.set("MONGO_LOGIN", MONGO_LOGIN);
    app.set("MONGO_PASSWORD", MONGO_PASSWORD);
    app.set("MONGO_DBNAME", MONGO_DBNAME);

    //Manage connection
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect(app.get('MONGO_URL') + '/' + app.get('MONGO_DBNAME'));
    var db = mongoose.connection;
    db.on('error', function () {
        console.log('Connection to dabatase FAILED');
    });
    db.on('open', function () {
        console.log('Connection to dabatase SUCCESS.')
    });
}

module.exports = {
    setDBConfig : setDBConfig
}
