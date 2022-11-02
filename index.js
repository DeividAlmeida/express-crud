const express = require("express");
const cors = require("cors");
const routes = require("./src/route");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/users", routes);
app.listen(3000);
