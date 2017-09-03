const express = require('express')
var app = express()
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const con = require('./mongo_connection.js');
const AccountController = require('./controllers/account.js');
const User = require('./models/user.js');
const AcntCon = new AccountController(User);
const config = require('./config'); // get our config file
const port = process.env.PORT || 3001; // used to create, sign, and verify tokens
const apiRoutes = express.Router();
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

app.use(express.static(__dirname + '/public'));
app.set('superSecret', config.secret); // secret variable
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});
app.use('/api', apiRoutes);
// use morgan to log requests to the console
app.use(morgan('dev'));
app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/register', function(req, resp) {
    var post = new User({
        email: 'arulkumarpmp1@gmail.com',
        firstName: "arul",
        lastName: "kumar",
        passwordHash: "arul"
    });
    AcntCon.register(post, function(err, res) {
        resp.send(res);
        console.log(res);
    });
})

app.get('/logon', function(req, resp) {
    //var post = new User({email: 'arulkumarpmp1@gmail.com',passwordHash:"arul"});
    console.log("----------"+req.query.email,req.query.passwordHash);
    AcntCon.logon(req.query.email, req.query.passwordHash, function(err, res) {
        console.log(res)
        if (res.success) {
            console.log(res)
            var token = jwt.sign(res.extras.userProfileModel, app.get('superSecret'), {
                expiresIn: 1440 // expires in 24 hours
            });
            res.extras.userProfileModel.token = token;
            resp.send(res);

        }else{
        	resp.send(err);
        }


        
        //console.log(res);
    });
})

app.get('api/password', function(req, resp) {

    var password = require('password-hash-and-salt');

    var myuser = [];

    // Creating hash and salt 
    password('mysecret').hash(function(error, hash) {
        if (error)
            throw new Error('Something went wrong!');

        console.log(hash);

        // Store hash (incl. algorithm, iterations, and salt) 
        myuser.hash = hash;

        // Verifying a hash 
        password('mysecret').verifyAgainst(myuser.hash, function(error, verified) {
            if (error)
                throw new Error('Something went wrong!');
            if (!verified) {
                console.log("Don't try! We got you!");
            } else {
                console.log("The secret is...");
            }
        });
    })



})



app.listen(port, function() {
    console.log('Example app listening on port 3000!');
    // con.createConnection();
});
module.exports = app;