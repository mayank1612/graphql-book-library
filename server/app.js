const express = require("express");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");

mongoose.connect(
  "mongodb+srv://mb-admin:mb-admin@cluster0.qokx2.mongodb.net/GraphqlPocDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();
app.use(cors());
dotenv.config();
const server = new ApolloServer({
  schema,
  playground: {
    endpoint: "http://localhost:4000/graphql",
  },
  subscriptions: {
    onConnect: () => console.log("Connected to websocket"),
  },
});

server.applyMiddleware({ app });

const httpServer = createServer(app);

server.installSubscriptionHandlers(httpServer);
httpServer.listen(4000, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(
    `Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`
  );
});
