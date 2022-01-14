const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const app = express();

const DB =
  "mongodb+srv://shahed:shahed123@cluster0.juwqm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(cors());
mongoose.connect(DB);
mongoose.connection.once("open", () => console.log("Database connected"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 8000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
