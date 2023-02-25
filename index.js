const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const mongoose=require('mongoose');


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-st');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);



mongoose.connect("mongodb://127.0.0.1:27017/passportdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
   
})
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("ERROR!");
        console.log(err);
    });


app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
   
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));








app.listen(8000 , ()=>{
    console.log("server started");
})