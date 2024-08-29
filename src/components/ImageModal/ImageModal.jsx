import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, image }) {
  if (!image) return null;
  console.log("Modal isOpen:", isOpen);
  console.log("Image in modal:", image);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
    >
      <div className={css.modal}>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={css.image}
        />
        <p className={css.author}>Author: {image.user.name}</p>
      </div>
    </Modal>
  );
}
