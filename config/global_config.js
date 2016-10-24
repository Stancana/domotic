var SERVER_PORT = 3000;

var setGlobalConfig = function(app){
    app.set("SERVER_PORT", SERVER_PORT);
}

module.exports = {
    setGlobalConfig : setGlobalConfig
}