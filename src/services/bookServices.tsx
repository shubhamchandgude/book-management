import axios from "axios";
import { type Book } from "../types";

const API_URL = "http://localhost:3001/books";

export const getBooks = async (): Promise<Book[]> => {
  const res = await axios.get<Book[]>(API_URL);
  return res.data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const res = await axios.get<Book>(`${API_URL}/${id}`);
  return res.data;
};

export const addBook = async (book: Book): Promise<void> => {
  await axios.post(API_URL, book);
};

export const updateBook = async (id: string, book: Book): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
