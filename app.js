const express = require("express");
const app = express();
const User = require("./controllers/usercontroller");
const db = require("./db");
const bodyParser = require("body-parser");
const Buzz = require("./controllers/buzzcontroller");
const Client = require("./controllers/clientcontroller");
const Com = require("./controllers/commentcontroller");
const router = require("./controllers/router");

db.sync({ force: false });

app.use(bodyParser.json());
app.use(require("./middleware/header"));

router(app, db);

// app.use('/user', User)

app.use(require("./middleware/validate-session"));

// app.use('/buzz', Buzz)

// app.use('/comment', Com)

app.use("/client", Client);

app.use("/api/test", function (req, res) {
  res.send("Looks like this is working...because we are awesome");
});

app.listen(3000, function () {
  console.log("app listening on port 3000");
});
