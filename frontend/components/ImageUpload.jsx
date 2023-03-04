import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 h-64 bg-gray-200 rounded-md overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-10">
            <p className="text-gray-600">No image selected</p>
          </div>
        )}
      </div>
      <div className="mt-5">
        <label
          htmlFor="image-upload"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md cursor-pointer"
        >
          Choose an image
        </label>
        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          onChange={handleChange}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
