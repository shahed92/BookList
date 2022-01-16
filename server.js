const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const DB =
  "mongodb+srv://shahed:shahed123@cluster0.juwqm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(cors());
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => console.log("hhhddh"));
// mongoose.connection.once("open", () => console.log("Database connected"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Accessing the path module
const path = require("path");

if (process.env.NODE_ENV === "production") {
  // Step 1:
  app.use(express.static("client/build"));
  // Step 2:
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
