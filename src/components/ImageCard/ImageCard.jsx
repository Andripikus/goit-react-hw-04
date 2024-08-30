import React from "react";
import css from "./ImageCard.module.css";

export default function ImageCard({ image, onImageClick }) {
  return (
    <div className={css.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.image}
        onClick={() => onImageClick(image)}
      />
    </div>
  );
}
