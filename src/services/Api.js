import axios from "axios";

const mainURL = "https://pixabay.com/api/?q=";
const last =
  "&key=16067916-d5eb1414a830d8329bdf43cfe&image_type=photo&orientation=horizontal&per_page=12";

const unite = "&page="

export const fetchImages = (query = "love", page) =>
  axios.get(mainURL + query + unite + page + last);