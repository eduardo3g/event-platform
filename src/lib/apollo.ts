import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-us-east-1.graphcms.com/v2/cl4qb8xpv3mpy01z4abxa7ga7/master",
  cache: new InMemoryCache(),
});
