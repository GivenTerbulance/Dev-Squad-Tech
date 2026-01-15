# API Reference

Detailed documentation for the Startup-Web backend API.

## Base URL
`/api`

## Standard Response Format
All successful responses return a JSON object with a `success` flag.

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

Errors follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

---

## Authentication

### POST `/api/auth/register`
Create a new user account.
- **Request Body**:
  - `email` (string, required, valid email)
  - `password` (string, required, min 8 chars)
  - `name` (string, required, min 2 chars)
- **Response**: `{ user: { ... }, token: "jwt-string" }`

### POST `/api/auth/login`
Authenticate an existing user.
- **Request Body**:
  - `email` (string, required)
  - `password` (string, required)
- **Response**: `{ user: { ... }, token: "jwt-string" }`

---

## User Profile

### GET `/api/users/me` [Auth Required]
Fetch the current logged-in user's profile.

### PATCH `/api/users/me` [Auth Required]
Update profile details.
- **Request Body**:
  - `name` (string, optional)
  - `image` (string, optional, valid URL)

---

## Reviews

### GET `/api/reviews`
Fetch a paginated list of all reviews.
- **Query Params**: 
  - `page` (default 1)
  - `limit` (default 10)
  - `search` (filter by comment text)
  - `rating` (filter by star rating, e.g., `5`)

### POST `/api/reviews` [Auth Required]
Submit a new review.
- **Request Body**:
  - `rating` (number, required, 1-5)
  - `comment` (string, optional, max 1000 chars)

---

## Feedback

### GET `/api/feedback`
Fetch a paginated list of feedback.
- **Query Params**: 
  - `page`
  - `limit`
  - `search` (filter by title or content)

### POST `/api/feedback` [Auth Required]
Submit feedback.
- **Request Body**:
  - `title` (string, required, min 3 chars)
  - `content` (string, required, min 10 chars)

---

## Admin Moderation [Admin Only]

### GET `/api/admin/stats`
Retrieve system statistics.

### GET `/api/admin/users`
List all users with activity counts (paginated).

### PATCH `/api/admin/users/:id`
Change a user's role.
- **Request Body**: `{ "role": "ADMIN" | "USER" }`

### DELETE `/api/admin/users/:id`
Permanently delete a user and their data.

### DELETE `/api/admin/reviews/:id`
Remove an inappropriate review.
