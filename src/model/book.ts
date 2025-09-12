 import { Author } from "./author";
 export interface Book {
  id: number;    
  title: string;          
  genre: string;
  publishedYear: number;   
  isbn?: string; 
  pages?: number;     
  summary?: string;
  author: Author;
}