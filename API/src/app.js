require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const rt = require("response-time");
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use(rt())
app.get("/", (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify({
    endpoints: require("./routes/utils").getEndpoints()
  }, null, 2))
})

app.use("/", require("./routes"))

app.listen(PORT, () => {
  console.log(`Servidor backend listo en puerto: ${PORT}. ✔`)
})