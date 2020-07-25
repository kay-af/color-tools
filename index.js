const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiv1Router = require("./api/endpoints/endpoint_v1");

const PORT = process.env.PORT || 43000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", apiv1Router);
app.use(express.static("public"));

app.listen(PORT, function () {
  console.log("Server started at " + PORT);
});
