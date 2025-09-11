import { Author } from "../model/author";
export let authorsList: Author[] = [];

let authorid: number = 1;

export const addAuthor = (firstName: string, lastName: string): Author => {
  const newAuthor: Author = { id: authorid++, firstName, lastName, books: [] };
  authorsList.push(newAuthor);
  return newAuthor;
};

export const getAllAuthors = (): Author[] => {
  return authorsList;
};

export const getAuthor = (id: number): Author | undefined => {
  const AuthorFound = authorsList.find((author) => author.id === id);
  return AuthorFound;
};

export const updateAuthor = (
  id: number,
  updatedFields: Partial<Omit<Author, "books">>
): Author | undefined => {
  const author = getAuthor(id);
  if (!author) return undefined;

  Object.assign(author, updatedFields);
  return author;
};

export const deleteAuthor = (id: number): Author | undefined => {
  const index = authorsList.findIndex((a) => a.id === id);
  if (index === -1) return undefined;

  const [deleted] = authorsList.splice(index, 1);
  return deleted;
};
