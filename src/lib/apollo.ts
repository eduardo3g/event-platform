import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "graphcms-uri.com",
  cache: new InMemoryCache(),
});
