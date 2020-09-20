import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { ApolloProvider } from "react-apollo";
import Sidebar from "./Sidebar";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  link: createUploadLink({ uri: "http://localhost:7000/graphql" }),
});

const Map = () => (
  <ApolloProvider client={client}>
    <div className="left-pane col-2 p-0">
      <Sidebar />
    </div>
    <div className="right-pane row-without-margin col-10">
      <div
        className="row col-12 ml-0 mr-0 pt-2"
        style={{
          maxHeight: "100%",
        }}
      />
    </div>
  </ApolloProvider>
);

export default Map;
