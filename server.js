const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { Package } = require('./models');
// const controllers = require('./controllers')

require('dotenv').config();

const app = express();
const {PORT = 4000, MONGODB_URL} = process.env;

app.use(cors()); // to prevent cors errors, open access to all origins
app.use(express.json()); // parse json bodies
app.use(morgan("dev")); // logging
// app.use('/packages', controllers.package)

// database connection 

mongoose.connect(MONGODB_URL,{ 
        useNewUrlParser: true
        , useUnifiedTopology: true
    }
);

mongoose.connection
.on('open', () => console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`))
.on('close', () => console.log('MongoDB disconnected  ⚡️ 🔌 ⚡️'))
.on('error', (error) => console.log('MongoDB connection error 😥', error));


// routes

app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.get("/packages", async (req, res) => {
    try {
      // send all people
      res.json(await Package.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  app.post("/packages", async (req, res) => {
    try {
     
      res.json(await Package.create(req.body));
    } catch (error) {
     
      res.status(400).json(error);
    }
  });

  app.put("/packages/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await Package.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  app.delete("/packages/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Package.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  app.get("/packages/:id", async (req, res) => {
    try {
        res.json(await Package.findOne({"_id": req.params.id}));
    } catch(err) {
        res.status(400).json(error);
    }
  });
	
// Tell the app to listen on port 4000
app.listen(PORT, () =>
 console.log(`Listening for client requests on port ${PORT}`));