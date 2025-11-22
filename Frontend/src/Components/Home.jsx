import React, { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert("Please Select a File!.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const responce = await axios.post(
        "https://word-to-pdf-converter-zeta.vercel.app/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([responce.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setConvert("File Converted Successfully!");
    } catch (error) {
      console.log(error);
      if (error.responce && error.responce.status === 400) {
        setDownloadError("Error occurred...", error.responce.data.message);
      }
      setConvert("");
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-6 py-3 md:px-40">
        <div className="flex h-screen justify-center items-center">
          <div className="border-2 border-dashed border-indigo-400 dark:border-indigo-600 px-6 py-8 md:px-12 md:py-10 rounded-2xl shadow-xl bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              Convert Word to PDF Online
            </h1>

            <p className="text-sm text-center mb-5 text-gray-600 dark:text-gray-300">
              Easily convert Word document to PDF format online, without having
              to install any software.
            </p>

            {/* Upload Section */}
            <div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                accept=".doc, .docx"
                onChange={handleFileChange}
                className="hidden"
                id="FileInput"
              />

              <label
                htmlFor="FileInput"
                className="w-full flex items-center justify-center px-6 py-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl shadow-lg cursor-pointer border border-gray-300 dark:border-gray-700 hover:bg-blue-600 hover:text-white duration-300"
              >
                <FaFileWord className="text-3xl mr-3 dark:text-blue-400 " />
                <span className="text-xl font-semibold">
                  {selectedFile ? selectedFile.name : "Choose File"}
                </span>
              </label>

              {/* Convert Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                className="disabled:bg-gray-400 disabled:pointer-events-none text-white bg-blue-500 hover:bg-blue-700 duration-300 font-bold px-6 py-3 rounded-xl shadow-md"
              >
                Convert File
              </button>

              {/* Messages */}
              {convert && (
                <div className="text-green-500 text-center font-medium">
                  {convert}
                </div>
              )}
              {downloadError && (
                <div className="text-red-500 text-center font-medium">
                  {downloadError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;



