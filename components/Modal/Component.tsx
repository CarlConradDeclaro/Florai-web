import Image from "next/image";
import React from "react";

export default function ImageModal({
  imageUrl,
  onClose,
}: {
  imageUrl: string | null;
  onClose: () => void;
}) {
  if (!imageUrl) return null; // Don't render if there's no image

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 cursor-pointer"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div className="relative">
        {/* Large Image Preview */}
        <Image
          width={500} // aspect ratio width
          height={500}
          src={imageUrl}
          alt="Preview"
          className="w-[80vw] h-[80vh] object-contain rounded-md"
        />
      </div>
    </div>
  );
}
