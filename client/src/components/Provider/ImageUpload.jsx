import React, { useEffect } from "react";
import { toast } from "react-toastify";

const ImageUpload = ({
  coverImage,
  setCoverImage,
  imageUrls,
  setImageUrls,
}) => {
  const parent = document.querySelector("#preview");

  useEffect(() => {
    let previewDiv = document.getElementById("preview");
    while (previewDiv.firstChild) {
      previewDiv.removeChild(previewDiv.firstChild);
    }
    if (imageUrls?.length > 0) {
      imageUrls.map((url) => {
        appendImage(url);
      });
    }
    if (coverImage?.length > 0) {
      coverImage.map((file) => {
        displayPreview(file);
      });
    }
  }, [imageUrls, coverImage]);

  const dropZoneDragOver = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.add("border-indigo-600");
  };
  const dropZoneDragLeave = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.remove("border-indigo-600");
  };
  const dropZoneDrop = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.remove("border-indigo-600");
    const files = e.dataTransfer.files;
    const fileInput = document.getElementById("fileUpload");
    if (files.length > 0 && fileInput) {
      fileInput.files = files;
      const event = new Event("change", { bubbles: true });
      fileInput.dispatchEvent(event);
    }
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    if (
      e.target.files.length > 8 ||
      8 - imageUrls?.length < e.target.files.length
    ) {
      toast.error("maximum 8 images allowed");
      return;
    }
    if (e.target.files.length < 1) return;
    const files = Array.from(e.target.files);
    setCoverImage(files);
  };

  function displayPreview(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var preview = document.createElement("img");
      preview.classList.add(
        "mx-auto",
        "w-24",
        "h-full",
        "rounded-md",
        "shadow-sm",
        "object-cover",
        "relative"
      );
      preview.src = reader.result;
      parent.appendChild(preview);
    };
  }

  function appendImage(src) {
    let preview = document.createElement("div");
    preview.classList.add(
      "relative",
      "rounded-md",
      "h-full",
      "shadow-sm",
      "overflow-hidden"
    );

    let image = document.createElement("img");
    image.classList.add("w-24", "h-full", "object-cover");
    image.src = src;
    preview.appendChild(image);

    let closeIcon = document.createElement("span");
    closeIcon.className =
      "absolute top-0 right-0 z-50 rounded-bl-md pb-1 px-1 bg-neutral-50 text-red-800 leading-none text-center font-bold text-xs cursor-pointer";
    closeIcon.textContent = "x";
    closeIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const previewDiv = e.target.parentElement;
      const previewImg = previewDiv.querySelector("img");
      setImageUrls(
        imageUrls.filter((url) => {
          if (url !== previewImg.src) {
            return url;
          }
        })
      );
    });
    preview.appendChild(closeIcon);
    document.getElementById("preview").appendChild(preview);
  }

  return (
    <div
      className="w-[400px] relative border-2  border-gray-300 border-dashed rounded-lg p-6"
      id="dropzone"
      onDrop={dropZoneDrop}
      onDragOver={dropZoneDragOver}
      onDragLeave={dropZoneDragLeave}
    >
      <input
        type="file"
        id="fileUpload"
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer "
        title="Upload Property Image"
        accept="image/*"
        multiple
      />
      <div className="text-center ">
        <h2 className="font-body font-bold text-lg  mb-4 text-center">
          Upload Property Images
        </h2>
        <img
          className="mx-auto h-12 w-12"
          src="https://www.svgrepo.com/show/357902/image-upload.svg"
          alt=""
        />

        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <label htmlFor="fileUpload">
            <span>Drag and drop</span>
            <span className="text-indigo-600"> or browse</span>
            <span> to upload</span>
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, JPEG</p>
      </div>

      <div className="grid grid-cols-4 mt-6 gap-2 pt-6 z-40" id="preview"></div>
    </div>
  );
};

export default ImageUpload;
