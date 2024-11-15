import { IKImage } from "imagekitio-react";

const urlEndpoint = "https://ik.imagekit.io/fireonline";
const publicKey = "public_tZkqVjH1ZWlzVyQgQ0JZYS7QTd8=";

const Video = (props) => {
  return (
    <IKImage urlEndpoint={urlEndpoint} publicKey={publicKey} {...props} />
  )
}

export default Video