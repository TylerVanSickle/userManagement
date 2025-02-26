# User Management App

This is a simple User Management application built with **Node.js** and **Express.js**. It allows users to **add, edit, and delete** user information that is stored in a MongoDB database. The app uses **Mongoose** for MongoDB object modeling and **Body-Parser** to parse incoming request bodies, while **CORS** ensures cross-origin requests can be made from the frontend.

## Features

- Add new users to the database.
- Edit existing user information.
- Delete users from the database.
- Display a list of all users on the front-end.
  
## Technologies Used

- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for handling routing and HTTP requests.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **CORS**: Middleware to enable cross-origin requests.
- **Body-Parser**: Middleware to parse incoming request bodies.
- **Live Server**: To serve static HTML pages.

## Installation

1. **Clone this repository** to your local machine:

   ```bash
   git clone <repository-url>
   cd <your-project-directory>
2. Install dependencies:

```In the project directory, run the following command to install the necessary npm packages:


Copy
npm install
Setup MongoDB:

Ensure that MongoDB is installed and running on your local machine or use a cloud-based MongoDB service (like MongoDB Atlas).
