import axios from "axios";
const API_BASE = "https://zeldvorik.ru/apiv3/api.php";

export const fetchData = async (params) => {
  const res = await axios.get(API_BASE, { params });
  return res.data;
};
