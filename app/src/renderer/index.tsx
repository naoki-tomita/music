import React from "react";
import {render} from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { App } from "./App";

const client = new ApolloClient({ uri: "http://localhost:8080/graphql" });

const app = document.createElement("div");
document.body.append(app);

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  app
);
