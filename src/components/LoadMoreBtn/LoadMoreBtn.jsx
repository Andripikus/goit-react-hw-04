// src/components/LoadMoreBtn/LoadMoreBtn.jsx
import React from "react";
import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      Load More
    </button>
  );
}
