import { Author } from "../model/author";
import { Book } from "../model/book";

let authorsList: Author[] = [];

let authorid: number = 1;

export const addAuthor = (
  id: number,
  firstName: string,
  lastName: string,
  books: Book[]
):Author => {
    const newAuthor : Author = {id : authorid++, firstName, lastName,  books}
    authorsList.push(newAuthor)
    return newAuthor
};

export const getAllAuthors = () : Author[] => {
    return authorsList
}

export const getAuthor = (id :  number) : Author | undefined => {
    const AuthorFound = authorsList.find(author => author.id === id)
    return AuthorFound
}

export const updateAuthor = (id : number, updatedFields : Partial<Author>) : Author[] => {
    return authorsList.map(author =>
    author.id === id ? { ...author, ...updatedFields } : author
  );
}

export const deleteAuthor = (id : number) => {
    return authorsList.filter(author => author.id !== id)
}




