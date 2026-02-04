import axios from "axios";

const BASE_URL = "https://zeldvorik.ru/apiv3/api.php";

export const fetchTrending = (page = 1) =>
  axios.get(`${BASE_URL}?action=trending&page=${page}`).then(res => res.data);

export const fetchCategory = (category: string, page = 1) =>
  axios.get(`${BASE_URL}?action=${category}&page=${page}`).then(res => res.data);

export const searchContent = (query: string) =>
  axios.get(`${BASE_URL}?action=search&q=${encodeURIComponent(query)}`).then(res => res.data);

export const fetchDetail = (detailPath: string) =>
  axios.get(`${BASE_URL}?action=detail&detailPath=${detailPath}`).then(res => res.data);
