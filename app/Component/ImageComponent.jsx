import React, { useState } from "react";
import Image from "next/image";

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState("/input.png");
  const [inputUrl, setInputUrl] = useState("");

  const handleUrlChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleImageChange = () => {
    setImageUrl(inputUrl);
    setInputUrl(""); 
    
  };



  return (
    <div className="flex flex-row justify-around items-center m-3">
      <div className="flex">
        <Image width={300} height={300} src={imageUrl} alt="logo" className="m-3 rounded-2xl"/>
      </div>
      <div className="">
        <input
          type="text"
          value={inputUrl}
          onChange={handleUrlChange}
          className="w-1/2 border border-solid p-3 rounded-xl m-3 shadow-xl"
          placeholder="Enter image URL"
        />
        <button
          onClick={handleImageChange}
          className="w-1/2 bg-blue-500 text-white p-3 rounded-xl m-3 shadow-xl hover:bg-blue-600"
        >
          Change Image
        </button>
      </div>
    </div>
  );
};

export default ImageComponent;
