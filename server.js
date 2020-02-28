const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const userController = require("./controllers/user");
const spendingController = require("./controllers/spending");

const MONGODB_CONN = `mongodb+srv://cv1:${process.env.DB_KEY}@cv1-qfdmo.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
mongoose.connect(MONGODB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/signup", userController.signup);
app.post("/postUser", userController.postUser);

app.get("/spending", spendingController.spending);
app.post("/postSpending", spendingController.postSpending);

app.get("/allList", spendingController.allList);

// listen for requests :)
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
  app.listen(app.get("port"), () => {
    console.log("Your app is listening on port " + app.get("port"));
  });
});
