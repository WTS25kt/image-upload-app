import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="App">
      <h2>画像を追加:</h2>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: "200px", marginTop: "20px" }} />}
      {file && <button onClick={handleUpload}>アップロード</button>}
    </div>
  );
}

export default App;