import gql from "graphql-tag";
import React from "react";
import { Mutation, MutationFunc } from "react-apollo";

const UploadFiles = () => (
  <Mutation
    mutation={gql`
      mutation multipleUpload($files: [Upload!]!) {
        multipleUpload(files: $files) {
          id
          path
          filename
          mimetype
          encoding
        }
      }
    `}
  >
    {(mutate: MutationFunc) => (
      <input
        type="file"
        multiple
        required
        onChange={e => {
          console.log(e.target.files);
          mutate({ variables: { files: e.target.files } }).catch((err: Error) =>
            console.error(err)
          );
        }}
      />
    )}
  </Mutation>
);

export default UploadFiles;
