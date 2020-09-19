import React from "react";

interface MusicBodyProps {
  src: string;
}

const MusicBody = ({ src }: MusicBodyProps) => (
  <iframe
    src={src}
    title="Underground"
    style={{ width: "100%", height: "100%" }}
    frameBorder="0"
    allow="encrypted-media"
  />
);

export default MusicBody;
