const compress = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../modules');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const setupMiddleware = function(app) {
    // compress
    app.use(compress());
    //helmet
    app.use(helmet());
    // set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)

    // Body parsing
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
    /*eslint-disable */
    app.use(routes.baseURI, routes.api(middleware));
};
/*eslint-disable */
const middleware = {
    api: {
        cors,
    },
};

module.exports = setupMiddleware;
module.exports.middleware = middleware;
