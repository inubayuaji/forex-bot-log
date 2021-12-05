const express = require("express");
const app = express();
const api = require("./routes/api.js");
const web = require("./routes/web.js");
const bodyParser = require("body-parser");
const {engine} = require("express-handlebars");
require("./db.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("./public"));

app.use("/", web);
app.use("/api", api);

module.exports = app;
