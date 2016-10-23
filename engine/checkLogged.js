/**
 * Created by Tabs on 23/10/2016.
 */
 function isLogged(req) {
    if(typeof req.session.passport != "undefined") return true;
    return false;
}

module.exports = {
    isLogged:isLogged
}