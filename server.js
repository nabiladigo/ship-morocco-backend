const express = require('express');
const methodOverride = require('method-override');
// const packages = require('./models/package_model');
const packageController = require('./controllers/package_controller');
const app = express();
// const cors = require("cors");
// const morgan = require("morgan");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");

const {PORT = 4000, MONGODB_URL} = process.env;
	
app.set('view engine', 'ejs')	

// for session
// app.use(
//     session(
//         {
//         // where to store the sessions in mongodb
//         store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),

//         // secret key is used to sign every cookie to say its is valid
//         secret: "super secret",
//         resave: false,
//         saveUninitialized: false,
//         // configure the experation of the cookie
//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
//         },
//         }
//     )
// );

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/packages', packageController);

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });

// user controllers
// app.use('/', controllers.user)

// app.use(cors()); // to prevent cors errors, open access to all origins
// app.use(morgan("dev")); // logging
// app.use(express.json()); // parse json bodies


// app.use((req, res, next) => {    
//     console.log("I'm running for another new route")
// 	console.log(`${req.method} ${req.originalUrl}`);    
// 	next();
// });


app.get('/', function(req, res) { 
     res.redirect('/Hello World!');
});

app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});

	
// Tell the app to listen on port 4000
app.listen(PORT, () =>
 console.log(`Listening for client requests on port ${PORT}`));