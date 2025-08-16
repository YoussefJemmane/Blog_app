# 📝 Blog App Project Kanban Board

---

## **Phase 1: Core Setup & Architecture**

### **Task #1: Initialize Node.js Project & Dependencies**
- [x] **Description:** Set up the initial Node.js project, install all required dependencies for the server, and prepare development tools.
- **✅ Definition of Done:**
    - [x] Node.js project initialized with `package.json`.
    - [ ] Dependencies installed: `express`, `dotenv`, `uuid`, `cors`.
    - [ ] Development dependencies installed: `nodemon`, `eslint`, `prettier`.
    - [ ] `scripts` for `dev`, `start`, `lint`, and `format` are added to `package.json`.
    - [ ] A `.gitignore` file is created to exclude `node_modules/` and `.env`.

### **Task #2: Implement Server & Folder Structure**
- [ ] **Description:** Create the main Express application files and establish the complete MVC folder structure as defined in the specification.
- **✅ Definition of Done:**
    - [ ] `src/server.js` (entry point) and `src/app.js` (Express app setup) are created.
    - [ ] The server runs successfully using `npm run dev`.
    - [ ] The required folder structure is in place: `src/routes`, `src/controllers`, `src/models`, `src/middleware`, `src/utils`, `src/config`, and `data`.
    - [ ] `express.json()` middleware is applied in `app.js`.

### **Task #3: Implement Core Middleware**
- [ ] **Description:** Create the mandatory middleware for request logging, centralized error handling, and handling 404 Not Found errors.
- **✅ Definition of Done:**
    - [ ] **Request Logger**: Middleware in `src/middleware/request-logger.js` logs requests in the format `METHOD PATH STATUS (ms)` (e.g., `POST /api/posts 201 (8ms)`).
    - [ ] **Error Handler**: Middleware in `src/middleware/error-handler.js` catches all thrown errors and formats them into the standard JSON error shape `{ "data": null, "error": { ... } }`. It ensures no response is sent twice.
    - [ ] **Not Found Handler**: Middleware in `src/middleware/not-found.js` handles any requests to unknown routes, returning a 404 status with the correct error message `{ error: { message: "Route not found" } }`.
    - [ ] All middleware are correctly integrated into `app.js`.

---

## **Phase 2: Persistence & Data Model**

### **Task #4: Implement JSON Persistence Module**
- [ ] **Description:** Build the `file-store.js` utility to handle all file system interactions for the `posts.json` file, including atomic writes and a write queue.
- **✅ Definition of Done:**
    - [ ] The module uses `fs/promises` for all file operations.
    - [ ] **Atomic Writes**: All write operations first write to a temporary file (e.g., `posts.tmp.json`) and then rename it to `posts.json` to prevent data corruption.
    - [ ] **Write Queue**: A single-process queue is implemented to serialize all write operations, ensuring they happen one after another.
    - [ ] The `data/posts.json` file is created with 2-3 sample posts matching the data model.

### **Task #5: Implement Post Model**
- [ ] **Description:** Create the `post-model.js` file which will define the data access API and interact with the JSON persistence module. The controller should not perform any direct file I/O.
- **✅ Definition of Done:**
    - [ ] The model exposes all required data functions: `findAll`, `findById`, `create`, `update`, `remove`, and `query`.
    - [ ] The `query` function handles filtering (search), sorting, and pagination logic.
    - [ ] All functions in the model interact with the persistence layer (`file-store.js`) and not directly with `fs`.

### **Task #6: Implement Post Validation Utilities**
- [ ] **Description:** Create validation functions in `utils/validate.js` to check the integrity of incoming post data for create and update operations.
- **✅ Definition of Done:**
    - [ ] A `validatePostCreate` function is created.
    - [ ] A `validatePostUpdate` function is created.
    - [ ] Functions return an object `{ value, error }`.
    - [ ] Validation rules are enforced: `title` (3-120 chars), `content` (10-10000 chars), `author` (2-60 chars), and `tags` (array of strings, ≤20 items).

---

## **Phase 3: API Endpoint Implementation**

### **Task #7: Implement GET /api/posts Endpoint**
- [ ] **Description:** Create the route, controller, and model logic to retrieve a paginated, sortable, and searchable list of all posts.
- **✅ Definition of Done:**
    - [ ] Route `GET /api/posts` is defined in `post-routes.js`.
    - [ ] Controller in `post-controller.js` orchestrates the request and calls the model.
    - [ ] Returns status `200` on success with the correct JSON shape, including `items` and pagination metadata (`page`, `limit`, `total`).
    - [ ] Supports query parameters: `page`, `limit`, `sort` (`createdAt`, `title`), `order` (`asc`, `desc`), and `q` for searching `title` and `content`.

### **Task #8: Implement GET /api/posts/:id Endpoint**
- [ ] **Description:** Create the route and controller logic to retrieve a single post by its ID.
- **✅ Definition of Done:**
    - [ ] Route `GET /api/posts/:id` is defined.
    - [ ] Returns status `200` with the post data if found.
    - [ ] Returns status `404` with the standard error shape if the post is not found.

### **Task #9: Implement POST /api/posts Endpoint**
- [ ] **Description:** Create the route and controller to add a new post, ensuring data is validated before creation.
- **✅ Definition of Done:**
    - [ ] Route `POST /api/posts` is defined.
    - [ ] The controller uses `validatePostCreate` to check the request body `{ "title", "content", "author", "tags?" }`.
    - [ ] Returns status `400` on validation error with details in the error response.
    - [ ] On success, it persists the new post using the model's `create` method.
    - [ ] Returns status `201` with the newly created post data.
    - [ ] `id`, `createdAt`, and `updatedAt` fields are generated automatically.

### **Task #10: Implement PUT /api/posts/:id Endpoint**
- [ ] **Description:** Create the route and controller to update an existing post by its ID, validating the incoming fields.
- **✅ Definition of Done:**
    - [ ] Route `PUT /api/posts/:id` is defined.
    - [ ] The controller uses `validatePostUpdate` for the request body.
    - [ ] Returns status `400` on validation error.
    - [ ] Returns status `404` if the post ID does not exist.
    - [ ] On success, it persists the changes and returns status `200` with the complete, updated post data.
    - [ ] The `updatedAt` field is updated upon a successful write.

### **Task #11: Implement DELETE /api/posts/:id Endpoint**
- [ ] **Description:** Create the route and controller to delete a post by its ID.
- **✅ Definition of Done:**
    - [ ] Route `DELETE /api/posts/:id` is defined.
    - [ ] Returns status `404` if the post ID does not exist.
    - [ ] On success, the post is removed from `posts.json` and the endpoint returns status `204 No Content` with an empty body.

---

## **Phase 4: Documentation & Finalization**

### **Task #12: Create Comprehensive README.md**
- [ ] **Description:** Finalize the project documentation, providing clear instructions for setup, running the server, and using the API.
- **✅ Definition of Done:**
    - [ ] Includes clear instructions on how to set up and run the project (`npm install`, `npm run dev`).
    - [ ] Documents the API, listing every endpoint.
    - [ ] Provides at least one example request and response for each endpoint.
    - [ ] Lists any known limitations or important design decisions.

### **Task #13: Create cURL Examples for API Testing**
- [ ] **Description:** Manually test all endpoints and provide a list of `cURL` commands for others to easily test the API.
- **✅ Definition of Done:**
    - [ ] All endpoints are manually tested for both happy paths and error cases (e.g., 404, 400).
    - [ ] A list of `cURL` commands for each endpoint is added to the `README.md`.

---

## **Bonus Tasks (Optional)**

### **Task #14: Switch Persistence to MongoDB**
- [ ] **Description:** Replace the JSON file persistence layer with a MongoDB database using Mongoose, without changing the API contract.
- **✅ Definition of Done:**
    - [ ] Mongoose is used for the database connection.
    - [ ] A Mongoose `Post` schema is created that matches the data model.
    - [ ] The `post-model.js` is refactored to use Mongoose methods (`find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`) instead of the `file-store.js`.
    - [ ] All API endpoints function identically to the JSON version.

### **Task #15: Implement JWT Authentication**
- [ ] **Description:** Add user authentication and protect the write endpoints (POST, PUT, DELETE).
- **✅ Definition of Done:**
    - [ ] An `/auth/login` endpoint is created that returns a JWT upon successful login.
    - [ ] Middleware is created to verify the `Authorization: Bearer <token>` header.
    - [ ] The POST, PUT, and DELETE routes for posts are protected by the authentication middleware.
    - [ ] Requests without a valid JWT to protected routes are rejected with an appropriate status code (e.g., 401 Unauthorized).

### **Task #16: Build a Frontend UI**
- [ ] **Description:** Create a user interface using React or vanilla HTML/CSS/JS to interact with the blog API.
- **✅ Definition of Done:**
    - [ ] The frontend consumes the backend API.
    - [ ] It provides a user interface for all CRUD (Create, Read, Update, Delete) operations.
    - [ ] The layout is responsive.
    - [ ] The project includes clear instructions on how to run the frontend.
