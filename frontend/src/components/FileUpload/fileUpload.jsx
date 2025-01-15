import React, { useState } from "react";
import axios from "axios";

import "./fileUpload.css";
import { StoreContext } from "../../context/StoreContext";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // const uploadFile = (e) => {};

  const { url } = useContext(StoreContext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("fileName", fileName);
    const formData = {
      file: file,
      fileName: fileName,
    };

    console.log(formData);
    try {
      const response = await axios.post(url + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
      alert("Error uploading file");
    }
  };

  const storeFileName = (e) => {
    setFileName(e.target.value);
  };

  return (
    <div className="file-upload-container">
      <div className="file-upload-section">
        <input type="text" placeholder="File Name" onChange={storeFileName} />
        <input
          type="file"
          placeholder="Browse Your File"
          onChange={handleFileChange}
          className="file-input"
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default FileUpload;
