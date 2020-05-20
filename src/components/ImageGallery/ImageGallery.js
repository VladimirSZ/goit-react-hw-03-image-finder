import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./imageGallery.module.css";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";

class ImageGallery extends Component {
  state = {
    isModalOpen: false,
    largeImageURL: null,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModal);
  }

  openModal = (e) => {
    if (e.currentTarget !== e.target) {
      this.setState({
        isModalOpen: true,
        largeImageURL: e.target.src,
      });
    }
  };

  closeModal = (e) => {
    if (e.code === "Escape" || e.currentTarget === e.target) {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  render() {
    const { isModalOpen, largeImageURL } = this.state;
    const { images } = this.props;

    return (
      <>
        <ul
          className={styles.ImageGallery}
          onClick={this.openModal}
          role="presentation"
        >
          {images.map((image) => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ul>
        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};