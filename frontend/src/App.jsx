import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import Video from "./ImageKit/Video";
import Image from "./ImageKit/Image";
import axios from "axios";
import { useState } from "react";

const urlEndpoint = "https://ik.imagekit.io/fireonline";
const publicKey = "public_tZkqVjH1ZWlzVyQgQ0JZYS7QTd8=";
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3001/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onError = (err) => {
  console.log("Error", err);
};

const onSuccess = (res) => {
  console.log("Success", res);
};

const onUploadProgress = progress => {
  console.log("Progress", progress);
};

const onUploadStart = evt => {
  console.log("Start", evt);
};



const videopath = "sample-video.mp4";

function App() {

  const [file, setFile] = useState(null);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:3001/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };
  return (
    <div className="App">
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <p>Upload an image</p>
        <IKUpload
          fileName={file}
          onFileUpload={uploadFile}
          onChange={(e) => setFile(e.target.files[0])}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          useUniqueFileName
        />

        <Image
          path="test-upload_pGZsRVm65F.png?updatedAt=1731536200161"
          alt=""
          width="600"
          height="400"
          lqip={{ active: true, quality: 10 }}
          //Si la imagen viene del backend se debe poner el path en el src
          //src="https://ik.imagekit.io/demo/default-image.jpg"
        />
        <Video
          path={videopath}
          width="600"
          height="400"
          lqip={{ active: true, quality: 10 }}
          controls
        />
      </IKContext>
      {/* ...other SDK components added previously */}
    </div>
  );
}

export default App;
