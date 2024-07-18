import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");

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
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setText(data.text);
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
      {text && (
        <div>
          <h3>抽出されたテキスト:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default App;