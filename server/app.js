const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//connect to db
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("connected to DB");
	})
	.catch(() => {
		console.error("cant connect to db");
	});

//import routes
const authRoutes = require("./routes/auth");

//app middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

//middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
