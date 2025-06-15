export interface Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  status: 'Available' | 'Issued';
}