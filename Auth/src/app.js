require("dotenv").config();
require("./strategies/discord")

const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session")
const mongoose = require("mongoose");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const { graphqlHTTP } = require("express-graphql");
const PORT = process.env.PORT || 3015;
const RootSchema = require("./graphql");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60000 * 60 * 24 * 2
  },
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/graphql", cors({ origin: [process.env.FRONTEND_URL, 'http://62.77.159.128:3001'], credentials: true }), graphqlHTTP({
  schema: RootSchema,
  graphiql: false
}))

app.use("/", require("./routes"))
app.listen(PORT, () => {
  console.log(`Servidor auth listo en puerto: ${PORT}. ✔`)
})