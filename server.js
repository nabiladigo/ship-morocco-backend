const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const controllers = require('./controllers');



// const session = require("express-session");
// const MongoStore = require("connect-mongo");

const app = express();
const PORT = process.env.PORT || 4000;


const urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json(), urlencodedParser);

// let whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: '*',
}
// function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors(corsOptions)); // to prevent cors errors, open access to all origins
app.use(express.json()); // parse json bodies
app.use(morgan('dev')); // logging
app.use('/packages', controllers.package);
app.use('/user', controllers.user);

// app.use("/", controllers.auth);

// app.use(
//   session({
//     // where to store the sessions in mongodb
//     store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/Ship_To_Morocco" }),
//     // secret key is used to sign every cookie to say its is valid
//     secret: "super secret",
//     resave: false,
//     saveUninitialized: false,
//     // configure the experation of the cookie
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
//     },
//   })
// );

// routes

// app.get('/', (req, res) => {
//     res.send("hello world");
//   });

app.get('/*', (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
  });

// Tell the app to listen on port 4000
app.listen(PORT, () =>
 console.log(`Listening for client requests on port ${PORT}`));