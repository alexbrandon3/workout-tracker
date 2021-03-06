const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
//Port values
const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout");
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}.`);
});