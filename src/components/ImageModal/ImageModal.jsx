// src/components/ImageModal/ImageModal.jsx
import React from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";

// Це важливо для коректної роботи модального вікна
Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, image }) {
  if (!image) return null;
 console.log('Modal isOpen:', isOpen); // Перевірка чи модальне вікно відкрите
  console.log('Image in modal:', image); // Перевірка отриманого зображення

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modal}>
        <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
        <p className={styles.author}>Author: {image.user.name}</p>
      </div>
    </Modal>
  );
}
