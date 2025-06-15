import axios from "axios";
import { type Book } from "../types";

const API_URL = "http://localhost:3001/books";

export const getBooks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getBookById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const addBook = async (book: Book) => {
  await axios.post(API_URL, book);
};

export const updateBook = async (id: string, book: Book) => {
  await axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
