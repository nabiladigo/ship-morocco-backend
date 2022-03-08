const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const controllers = require('./controllers')

const app = express();
const PORT = 4000;

// app.use(express.urlencoded({ extended: false }));
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(express.json()); // parse json bodies
app.use(morgan('dev')); // logging
app.use('/packages', controllers.package)
// app.use('/user', controllers.user)



// routes

app.get('/', (req, res) => {
    res.send("hello world");
  });

app.get('/*', (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
  });

// Tell the app to listen on port 4000
app.listen(PORT, () =>
 console.log(`Listening for client requests on port ${PORT}`));