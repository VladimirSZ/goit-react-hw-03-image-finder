import React from "react";
import styles from "./imageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ image: { id, tags, webformatURL } }) => (
  <li key={id} className={styles.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      className={styles.ImageGalleryItemImage}
      width="300"
      height="200"
    />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
};