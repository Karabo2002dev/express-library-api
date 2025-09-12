import { Book } from "./book";

export interface Author {
  id: number;  
  firstName: string;  
  lastName: string;
  birthDate?: Date;     
  nationality?: string;
  biography?: string;
  books?: Book[];    
}