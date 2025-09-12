import { Book } from "../model/book";
import { authorsList } from "./author";

let booksList: Book[] = [];

let bookId: number = 1;

export const addBook = (
  title: string,
  genre: string,
  publishedYear: number,
  authorId: number,
  isbn?: string,
  pages?: number,
  summary?: string
): Book | undefined => {
  const author = authorsList.find((author) => author.id === authorId);

  if (!author) return undefined;

  const newBook: Book = {
    id: bookId++,
    title,
    genre,
    publishedYear,
    isbn,
    pages,
    summary,
    author,
  };

  booksList.push(newBook);
  author.books?.push(newBook);

  return newBook;
};

export const getAllBooks = (): Book[] => booksList;
export const getBook = (id: number): Book | undefined =>
  booksList.find((book) => book.id === id);
export const updateBook = (
  id: number,
  updatedFields: Partial<Omit<Book, "author">>
): Book | undefined => {
  const book = getBook(id);

  if (!book) return undefined;

  Object.assign(book, updatedFields);
  return book;
};

export const deleteBook = (id: number): Book[] | undefined => {
  const book = getBook(id);

  if (!book) return undefined;

  return booksList.filter((book) => book.id !== id);
};

export const listBookByAuthor = (id: number): Book[] | undefined => {
  const author = authorsList.find((author) => author.id === id);

  if (!author) return undefined;
  return author.books;
};
