# Smart Brain API - Backend

Smart Brain API is the backend service for the Smart Brain Face Detection App. It is a RESTful API built using Node.js and Express, with MySQL as the database for user authentication and tracking image submissions. The database runs in a Docker container for easy local development and future self-hosting. The app uses the Clarifai API for face detection functionality. This project is part of the Complete Web Developer Course by Zero To Mastery. For detailed information about the frontend implementation, please refer to the [frontend repository](https://github.com/dantvi/smart-brain). 

## Table of contents

- [Smart Brain API - Backend](#smart-brain-api---backend)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Links](#links)
    - [Built with](#built-with)
    - [How It Works](#how-it-works)
    - [API Endpoints](#api-endpoints)
      - [Base URL: `http://localhost:3000`](#base-url-httplocalhost3000)
    - [What I learned](#what-i-learned)
    - [Setup Instructions](#setup-instructions)
      - [Prerequisites](#prerequisites)
      - [Installation](#installation)
      - [Running the Server](#running-the-server)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

The Smart Brain API provides essential backend functionality for the application, including:
- JWT-based User Authentication: Users authenticate using a JSON Web Token for secure, stateless sessions.
- Face Detection: Processes image URLs through the Clarifai API to detect faces using AI models.
- Image Submission Tracking: Keeps a count of the images submitted by each user for personalized statistics.
- Profile Management: Enables retrieval of user profiles, including submission stats and other details.
- Dockerized Database: Uses a MySQL database containerized with Docker for easier local setup and future deployment.

### Links

- Frontend: [GitHub Repository](https://github.com/dantvi/smart-brain)
- Backend API: [GitHub Repository](https://github.com/dantvi/smart-brain-api)
- Live Site URL: [DT Code](https://smart-brain.dtcode.se/)

### Built with

- Node.js: JavaScript runtime for building the server.
- Express: Framework for creating RESTful APIs.
- MySQL: Database for storing user data, run in Docker.
- Knex.js: SQL query builder for database interactions.
- bcrypt-nodejs: For password hashing and validation.
- Clarifai API: For face detection functionality.
- jsonwebtoken: For generating and verifying JWT tokens.
- Cors: Middleware for handling cross-origin requests.
- dotenv: For managing environment variables securely.
- Docker & Docker Compose: For local database and easy portability.

### How It Works

- User Authentication with JWT:
  - Users register with a name, email, and password. Passwords are securely hashed and stored.
  - On sign-in, credentials are verified and a JWT token is returned.
  - Protected routes require this token in the Authorization header.
- Image Submission:
  - Authenticated users submit an image URL.
  - The URL is sent to the Clarifai API for face detection.
  - The number of images processed is tracked and stored for each user.
- Profile Management:
  - User profiles, including submission stats, can be retrieved using the /profile/:id endpoint, protected by JWT.
- Dockerized Database:
  - A MySQL database runs inside a Docker container for easy local development and future hosting on a server or Raspberry Pi.

### API Endpoints

#### Base URL: `http://localhost:3000`

| Method | Endpoint       | Description                                               |
| ------ | -------------- | --------------------------------------------------------- |
| GET    | `/`            | Health check: confirms API is running.                    |
| POST   | `/signin`      | Authenticates user credentials and returns a JWT token.   |
| POST   | `/register`    | Registers a new user.                                     |
| GET    | `/profile/:id` | Retrieves a user profile by ID. Requires valid JWT.       |
| PUT    | `/image`       | Updates user submission count. Requires valid JWT.        |
| POST   | `/imageurl`    | Interacts with the Clarifai API for face detection.       |

### What I learned

- Building a RESTful API with Node.js and Express.  
- Using Knex.js to simplify database queries.  
- Managing sensitive data securely with dotenv and environment variables.
- Integrating JWT for stateless authentication.
- Protecting API routes using Express middleware.
- Running a local database in Docker for easy development and future self-hosting.
- Using Clarifai for powerful AI-based face detection.

Here’s an example of the updated handleSignin function showing how JWT is generated:

```js
const jwt = require('jsonwebtoken');

const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  db('login')
    .where({ email })
    .first()
    .then((data) => {
      if (!data) {
        return res.status(400).json('wrong credentials');
      }

      const isValid = bcrypt.compareSync(password, data.hash);
      if (isValid) {
        return db('users')
          .where({ email })
          .first()
          .then((user) => {
            if (!user) {
              return res.status(400).json('unable to get user');
            }
            // Generate JWT token
            const token = jwt.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: '2h' }
            );
            res.json({ user, token });
          });
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json('wrong credentials');
    });
};

module.exports = {
  handleSignin,
};
```

### Setup Instructions

#### Prerequisites

- Node.js installed on your machine.
- Docker & Docker Compose installed to run MySQL locally.
- A Clarifai API Key, available at [Clarifai](https://www.clarifai.com/).

#### Installation

1. Clone the repository: 
```bash
git clone https://github.com/dantvi/smart-brain-api.git
cd smart-brain-api
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory and add your environment variables:
```makefile
# Database config
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=password
DB_NAME=smartbrain_db

# Clarifai
CLARIFAI_API_KEY=your_api_key_here

# JWT secret
JWT_SECRET=my_super_secret_key

# App port
PORT=3000
```
4. Run the MySQL database using Docker:
```bash
docker-compose up -d
```

#### Running the Server

1. Start the server:
```bash
npm start
```
2. The API will run locally on `http://localhost:3000`.

3. Use Postman or your frontend app to test:
   - Log in via /signin to get a JWT.
   - Use Authorization: Bearer <token> header on protected routes.

### Useful resources

- [Express Documentation](https://expressjs.com/)
- [Knex.js Documentation](https://knexjs.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Clarifai API Documentation](https://docs.clarifai.com/)
- [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)
- [Docker Documentation](https://docs.docker.com/)

## Author

- GitHub - [@dantvi](https://github.com/dantvi)
- LinkedIn - [@danieltving](https://www.linkedin.com/in/danieltving/)

## Acknowledgments

Special thanks to Zero To Mastery for providing a comprehensive and practical learning experience. Huge thanks to Andrei Neagoie for his clear explanations and practical real-world projects. Also, platforms like MDN Web Docs and Stack Overflow have been instrumental in resolving challenges and deepening understanding throughout this project.
