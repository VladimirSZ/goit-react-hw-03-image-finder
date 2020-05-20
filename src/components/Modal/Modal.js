import React from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ largeImageURL, onClose }) => (
  <div className={styles.Overlay} onClick={onClose} role="presentation">
    <div className={styles.Modal}>
      <img src={largeImageURL} alt="" width="840" height="627" />
    </div>
  </div>
);

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};