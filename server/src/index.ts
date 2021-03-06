import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";

const app = express();
const port = 9000;

const apolloServer = async () => {
  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app, path: "/api" });
};

apolloServer();

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
