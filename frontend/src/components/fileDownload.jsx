import React, { useState } from "react";
import axios from "axios";

const FileDownload = () => {
  const [fileId, setFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleDownload = async () => {
    if (!fileId) {
      alert("Please enter a file ID");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/file/${fileId}`, {
        responseType: "blob",
      });
      console.log(response);
      const data = await response.data;
      console.log(data);

      const url = URL.createObjectURL(response.data);

      // const url = URL.createObjectURL(response.data);
      setFileUrl(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  //   const handleDownload = async () => {
  //     if (!fileId) {
  //       alert("Please enter a file ID");
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(`http://localhost:5000/file/${fileId}`, {
  //         responseType: "blob",
  //       });

  //       //   setFileUrl(url);
  //     } catch (error) {
  //       console.error("Error downloading file:", error);
  //     }
  //   };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter File ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />
      <button onClick={handleDownload}>Download File</button>
      {fileUrl && (
        <div>
          <a href={fileUrl} download>
            Click here to download
          </a>
        </div>
      )}
    </div>
  );
};

export default FileDownload;
