const express = require("express");
const bodyParser = require("body-parser");

const {
  helmet,
  cors,
  limiter,
  favicon,
  morgan,
} = require("./utils/middlewares");

// routes
const index = require("./routes/index");
const secure = require("./routes/secure");
const login = require("./routes/login");
const fetch = require("./routes/fetch");

const app = express();

// middle wares
// morgan
app.use(morgan.assignId);
app.use(morgan.structure);
app.use(morgan.dev);
// helmet
app.use(helmet);
// cors
app.use(cors);
// limiter
app.use(limiter); //  apply to all requests
// favicon
app.use(favicon);

app.use(express.json({ limit: 1048576 }));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", index);
app.use("/secure/", secure);
app.use("/login/", login);
app.use("/admin/", fetch);

module.exports = app;
