import gql from "graphql-tag";
import React from "react";
import { useMutation } from "react-apollo";

const query = gql`
      mutation multipleUpload($files: [Upload!]!) {
        multipleUpload(files: $files) {
          id
          path
          filename
          mimetype
          encoding
          svgAddress
        }
      }
    `

const UploadFiles = () => {
    const [mutate] = useMutation<any, any>(query);

    return (
        <input
            type="file"
            multiple
            required
            onChange={e => {
                console.log(e.target.files);
                mutate({variables: {files: e.target.files}})
                    .then(response => {
                        if (response) {
                            const {data} = response;
                            console.log(data.multipleUpload);
                            const {filename, svgAddress} = data.multipleUpload[0];

                            fetch(svgAddress)
                                .then(resp => resp.blob())
                                .then(blob => {
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = filename + ".svg";
                                    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                                    a.click();
                                    a.remove();
                                });
                        }
                    })
                    .catch((err: Error) => console.error(err));
            }}
        />
    )
};

export default UploadFiles;
