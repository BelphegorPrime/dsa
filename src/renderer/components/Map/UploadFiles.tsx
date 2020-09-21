import React from "react";

type fileResponse = {
  data: {
    multipleUpload: {
      id: string;
      path: string;
      filename: string;
      mimetype: string;
      encoding: string;
      svgAddress: string;
    }[];
  };
};

const uploadFiles = async (files: File[]): Promise<fileResponse> => {
  const fd = new FormData();
  files.forEach((file) => {
    fd.append(file.name, file);
  });

  const response = await fetch("http://localhost:7000/multipleUpload", {
    method: "POST",
    body: fd,
  });
  const data = await response.json();
  console.log(data);

  return {
    data: {},
  } as fileResponse;
};

const UploadFiles = () => {
  return (
    <input
      type="file"
      multiple
      required
      onChange={(e) => {
        if (e.target.files) {
          uploadFiles(Array.from(e.target.files))
            .then((response) => {
              if (response) {
                const { data } = response;
                console.log(data.multipleUpload);
                const { filename, svgAddress } = data.multipleUpload[0];

                fetch(svgAddress)
                  .then((resp) => resp.blob())
                  .then((blob) => {
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
        }
      }}
    />
  );
};

export default UploadFiles;
