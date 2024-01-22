import React from "react";
import { FC } from "react";

interface ImageCardProps {
  props?: any;
  imgSrc?: string;
  children?: string;
}

const ImageCard: FC<ImageCardProps> = ({ imgSrc, props, children }) => {
  return (
    <div
      {...props}
      className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group"
    >
      <img
        className="transition-transform group-hover:scale-110 duration-200"
        src={imgSrc}
        alt={imgSrc}
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-tr from-black/60 to-transparent">
        <div className="p-4 text-white">{children}</div>
      </div>
    </div>
  );
};

export default ImageCard;
