# Book Review API ( [Assignment Link](https://docs.google.com/document/d/1G5O-36KW96MiCN6hokGe8NVPkbhnJ86L8IpXSLbY99w) )

A RESTful API for a book review system built with Node.js, Express, TypeScript, and Prisma.

## Features

- User authentication with JWT
- Book management (create, list, get details)
- Review system (create, update, delete reviews)
- Search functionality
- Pagination and filtering
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. Clone the repository:

```bash
git clone https://github.com/abkux/book_review_api.git
cd book_review_api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/book_review_db?schema=public"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. Initialize the database:

```bash
npx prisma migrate dev
```

5. Generate Prisma client:

```bash
npx prisma generate
```

6. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- `POST /auth/login` - Login and get JWT token

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Books

- `POST /books` - Create a new book (requires authentication)

  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Fiction",
    "description": "Book description"
  }
  ```
- `GET /books` - Get all books with pagination and filters

  ```
  /books?page=1&limit=10&author=Author&genre=Fiction
  ```
- `GET /books/:id` - Get book details with reviews

  ```
  /books/:id?page=1&limit=10
  ```

### Reviews

- `POST /reviews/books/:bookId` - Create a review (requires authentication)

  ```json
  {
    "rating": 5,
    "comment": "Great book!"
  }
  ```
- `PUT /reviews/:id` - Update a review (requires authentication)

  ```json
  {
    "rating": 4,
    "comment": "Updated review"
  }
  ```
- `DELETE /reviews/:id` - Delete a review (requires authentication)

### Search

- `GET /search` - Search books by title or author
  ```
  /search?q=search_term&page=1&limit=10
  ```

## Database Schema

### User

- id: UUID (primary key)
- email: String (unique)
- password: String (hashed)
- name: String
- createdAt: DateTime
- updatedAt: DateTime

### Book

- id: UUID (primary key)
- title: String
- author: String
- genre: String
- description: String (optional)
- createdAt: DateTime
- updatedAt: DateTime

### Review

- id: UUID (primary key)
- rating: Integer (1-5)
- comment: String (optional)
- userId: UUID (foreign key)
- bookId: UUID (foreign key)
- createdAt: DateTime
- updatedAt: DateTime

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```
