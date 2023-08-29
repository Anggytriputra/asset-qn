import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { errorAlertWithMessage } from "../helper/alerts";

export default function ImageDragAndDrop({ className, image, setImage }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        const newImages = acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setImage((prevImages) => [...prevImages, ...newImages]);
      }
    },
    [setImage]
  );

  const onDropRejected = useCallback(() => {
    errorAlertWithMessage("File not supported!");
  });

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".png"],
      },
      maxSize: 1024 * 1000,
      onDrop,
      onDropRejected,
    });

  function handleRemoveFile(index) {
    setImage((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  }

  return (
    <div className={className}>
      <div
        {...getRootProps({
          className: `flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 cursor-pointer ${
            isDragActive ? "bg-gray-50" : ""
          }`,
        })}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            {isDragActive ? (
              <p>Drop the file here ...</p>
            ) : (
              <p>
                <span className="relative cursor-pointer rounded-md bg-white font-medium text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500">
                  Upload a file
                </span>{" "}
                or drag and drop
              </p>
            )}
            <input
              {...getInputProps({
                className: "sr-only",
              })}
            />
          </div>
          <p className="text-xs text-gray-500">PNG, JPG up to 1MB</p>
        </div>
      </div>
      {image.length > 0 && (
        <>
          <p className="mt-4 text-sm">Uploaded Images:</p>
          <div className="grid grid-cols-3 gap-4">
            {" "}
            {/* Tambahkan kelas ini */}
            {image.map((img, index) => (
              <div
                className="relative "
                key={index}
              >
                <img
                  className="w-full h-full object-cover"
                  src={img.preview}
                  alt={`uploaded product ${index}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="bg-red-400 text-white w-6 h-6 rounded-full absolute -top-2 -right-2 hover:bg-red-500"
                  aria-label={`remove image ${index}`}
                >
                  <XMarkIcon />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
