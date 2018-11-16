import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
    `}>
    {mutate => (
      <input
        type="file"
        multiple
        required
        onChange={e => {
          console.log(e.target.files);
          mutate({ variables: { files: e.target.files } });
        }}
      />
    )}
  </Mutation>
);

export default UploadFiles;
