var MONGO_URL = "mongodb://localhost:27017"
var MONGO_LOGIN = ""
var MONGO_PASSWORD = ""

var setDBConfig = function(app){
    app.set("MONGO_URL", MONGO_URL);
    app.set("MONGO_LOGIN", MONGO_LOGIN);
    app.set("MONGO_PASSWORD", MONGO_PASSWORD);
}

module.exports = {
    setDBConfig : setDBConfig
}
