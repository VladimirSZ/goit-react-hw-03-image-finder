import React, { Component } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "react-loader-spinner";
import * as imagesAPI from "./services/Api";
import SearchBar from "./components/Searchbar/Searchbar";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import styles from "./app.module.css";

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: "",
    page: 1,
    isModalOpen: false,
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = () => {
    this.setState({
      isLoading: true,
    });
    imagesAPI
      .fetchImages(this.state.query, 1)
      .then(({ data }) =>
        this.setState((prevState) => ({
          images: [...data.hits],
          page: prevState.page + 1,
        }))
      )
      .catch((error) =>
        this.setState({
          error,
        })
      )
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handleQueryChange = (e) => {
    e.persist();
    this.setState({
      query: e.target.value,
    });
  };

  loadMoreBtn = () => {
    imagesAPI
      .fetchImages(this.state.query, this.state.page + 1)
      .then((data) =>
        this.setState((prevState) => ({
          page: prevState.page + 1,
          images: [...prevState.images, ...data.data.hits],
        }))
      )
      .catch((error) =>
        this.setState({
          error,
        })
      )
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        this.setState({
          isLoading: false,
        });
      });
  };

  showModal = (e) => {
    this.setState({
      isModalOpen: true,
    });
    console.log(e.target);
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { images, isLoading, query, isModalOpen } = this.state;
    return (
      <div className={styles.App}>
        <SearchBar
          query={query}
          handleQueryChange={this.handleQueryChange}
          fetchImages={this.getImages}
        />
        {isLoading && (
          <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
        )}
        <ImageGallery images={images} openModal={this.showModal} />
        {isModalOpen && (
          <Modal handleCloseModal={this.closeModal} images={images} />
        )}
        {images.length > 0 && <Button loadMoreBtn={this.loadMoreBtn} />}
      </div>
    );
  }
}

export default App;