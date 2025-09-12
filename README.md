# Express-Library-Api

# Description

A simple RESTful API built with **Node.js** and **TypeScript** and **Express JS** for managing a book library.  
Supports CRUD operations (Create, Read, Update, Delete) for both **Authors** and **Books** with JSON data.

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [License](#license)

# Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Karabo2002dev/express-library-api.git
   cd express-library-api
   code .

   ```

2. Install dependencies
   ```bash
   git checkout dev
   npm install
   ```

# Usage

1. Run Project
   ```bash
   npm run dev
   ```
---

2. API Endpoints

- NB use https://www.postman.com/ for endpoint testing

- http://localhost:3000 or prefered port able to change on [server.ts]

## Authors endpoints

### Get all authors

`GET /authors`

![getAuthors Screenshot](src/screenshots/getAuthors.png)

### Get single author

`GET /authors/id`

![getAuthorById Screenshot](src/screenshots/getAuthorById.png)

### Add new author

`POST /authors`

**Request body:**

```json
{
  "firstName": "Lebo",
  "lastName": "Kgaphola"
}
```
![postAuthor Screenshot](src/screenshots/postAuthor.png)
![postAuthor Results Screenshot](src/screenshots/postAuthor%20Results.png)

### Update author

`PUT /authors/id`

**Request body:**

```json
{
  "firstName": "Paul",
  "lastName": "Doe"
}
```
![updateAuthor Screenshot](src/screenshots/updateAuthor.png)
![updateAuthor Results Screenshot](src/screenshots/updateAuthor%20Results.png)

### Delete author

`DELETE /authors/id`

![deleteAuthor Screenshot](src/screenshots/deleteAuthor.png)
![deleteAuthor Results Screenshot](src/screenshots/deleteAuthor%20Results.png)

## Books endpoints

### Get all books

`GET /books`

![getBooks Screenshot](src/screenshots/getBooks.png)

### Get single book

`GET /books/id`

![getBookById Screenshot](src/screenshots/getBookById.png)

### Add new author

`POST /books`

**Request body:**

```json
{
  "title": "Things Fall Apart",
  "genre": "Fiction",
  "publishedYear": 2025,
  "authorId": 1,
  "isbn": "123456456",
  "pages": 300,
  "summary": "A classic African novel."
}
```
![postBook Screenshot](src/screenshots/postBook.png)
![postBook Results Screenshot](src/screenshots/postBook%20Results.png)

### Update book

`PUT /books/id`

**Request body:**

```json
{
  "title": "Why Me?",
  "genre": "Fiction",
  "publishedYear": 2025,
  "authorId": 1,
  "isbn": "123456456",
  "pages": 300,
  "summary": "A classic African novel."
}
```
![updateBook Screenshot](src/screenshots/updateBook.png)
![updateBook Results Screenshot](src/screenshots/updateBook%20Results.png)

### Delete author

`DELETE /books/id`

![deleteBook Screenshot](src/screenshots/deleteBook.png)
![deleteBook Results Screenshot](src/screenshots/deleteBook%20Results.png)

### Get books by author

`GET /authors/id/books`

![getBooksByAuthor Screenshot](src/screenshots/getBooksByAuthor.png)
![getBooksByAuthor Results Screenshot](src/screenshots/getBooksByAuthor%20Results.png)



# Project Structure

    ```bash
    src/
    ├── controllers/   # Request handlers
        ├── author.ts  # Author Request handlers 
        └── book.ts    # Books Request handlers 
    ├── middleware/   # middleware handlers
        ├── errorMiddleware.ts      # error handler middleware
        ├── loggerMiddleware.ts     # logger middleware (Log request)
        └── validationMiddleware.ts   # validator middleware 
    ├── models/        # Data models
        ├── author.ts   # Author model
        └── book.ts     # Book model
    ├── routes/        # API routes
        ├── author.ts   # Authors router
        └── book.ts     # Books router
    └── server.ts       # App entry point
    ```

# Technologies

- Node.js
- TypeScript
- Express (Framework)
- Postman (for testing)

# License

MIT License © 2025 Karabo Kgaphola
