import React from "react";
import styles from "./button.module.css";
import PropTypes from "prop-types";

const Button = ({ loadMoreBtn }) => (
  <button onClick={loadMoreBtn} className={styles.Button}>
    Load more
  </button>
);

export default Button;

Button.propType = {
  loadMoreBtn: PropTypes.func.isRequired,
};