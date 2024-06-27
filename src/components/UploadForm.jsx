import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 10485760, // 10MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    if (description.length > 200) {
      setError("Description should not exceed 200 characters.");
      return;
    }

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "uploads"), {
          url: downloadURL,
          description,
          createdAt: new Date(),
        });
        setFile(null);
        setDescription("");
        setProgress(0);
        setError("");
      }
    );
  };

  return (
    <div className="upload-form">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {file && <p>Selected file: {file.name}</p>}
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
      />
      <Button onClick={handleUpload}>Upload</Button>
      {progress > 0 && <Progress value={progress} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UploadForm;