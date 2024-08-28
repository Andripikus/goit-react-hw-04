// src/components/ImageCard/ImageCard.jsx
import React from "react";
import styles from "./ImageCard.module.css";

export default function ImageCard({ image, onImageClick }) {
  return (
    <div className={styles.card} onClick={() => onImageClick(image)}>
      <img src={image.urls.small} alt={image.alt_description} className={styles.image} />
    </div>
  );
}
