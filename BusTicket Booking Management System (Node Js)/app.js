var express    = require('express');
var bodyParser = require('body-parser');
var exSession = require('express-session');
//const {check,validationResult} = require('express-validator/check');
//const {matchedData, sanitize}= require('express-validator/filter');
//var cookieParser 	= require('cookie-parser');
var adminreg      = require('./controller/adminreg');
var adminlogin      = require('./controller/adminlogin');
var home       = require('./controller/home');
var login      = require('./controller/login');
var userhome       = require('./controller/userhome');
var reg       = require('./controller/reg');
var sellerlogin      = require('./controller/sellerlogin');
var sellerreg      = require('./controller/sellerreg');
var sellerhome      = require('./controller/sellerhome');
var app        = express();
var port       = 3000;

//config:
app.set('view engine','ejs');

//Middleware:
app.use(exSession({secret: 'my top secret code', saveUninitialized: true, resave: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/adminreg', adminreg);
app.use('/login', login);
app.use('/adminlogin', adminlogin);

app.use('/userhome', userhome);
app.use('/reg', reg);
app.use('/home', home);

app.use('/sellerreg', sellerreg);
app.use('/sellerlogin', sellerlogin);
app.use('/sellerhome', sellerhome);
//app.use('/assets', express.static('ext'));
app.use(express.static('public'));
//routes:
app.get('/', (req,res)=>res.send('Index page'));

//SERVER STARTUP
app.listen(port, ()=>console.log('server started at '+port+" ..."));