# Smart Brain API - Backend

Smart Brain API is the backend service for the Smart Brain Face Detection App. It is a RESTful API built using Node.js and Express, with PostgreSQL as the database for user authentication and tracking image submissions. The app leverages the Clarifai API for face detection functionality. This project is part of the Complete Web Developer Course by Zero To Mastery. For detailed information about the frontend implementation, please refer to the [frontend repository](https://github.com/dantvi/smart-brain). 

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
- User Authentication: Allows users to register or sign in securely, with hashed passwords for protection.
- Face Detection: Processes image URLs through the Clarifai API to detect faces using AI models.
- Image Submission Tracking: Keeps a count of the images submitted by each user for personalized statistics.
- Profile Management: Enables retrieval of user profiles, including submission stats and other details.

### Links

- Frontend: [GitHub Repository](https://github.com/dantvi/smart-brain)
- Backend API: [GitHub Repository](https://github.com/dantvi/smart-brain-api)
- Live Site URL: [DT Code](https://smart-brain.dtcode.se/)

### Built with

- Node.js: JavaScript runtime for building the server.
- Express: Framework for creating RESTful APIs.
- PostgreSQL: Database for storing user data.
- Knex.js: SQL query builder for database interactions.
- bcrypt-nodejs: For password hashing and validation.
- Clarifai API: For face detection functionality.
- Cors: Middleware for handling cross-origin requests.
- dotenv: For managing environment variables securely.

### How It Works

- User Authentication:
  - Users register with a name, email, and password. Passwords are securely hashed and stored.
  - Login credentials are verified against stored hashes during sign-in.
- Image Submission:
  - Users submit an image URL. The URL is sent to the Clarifai API for face detection.
  - The number of images processed is tracked and stored for each user.
- Face Detection:
  - The API sends image URLs to the Clarifai API and receives bounding box data for detected faces.
- Profile Management:
  - User profiles, including submission stats, can be retrieved using the /profile/:id endpoint.

### API Endpoints

#### Base URL: `http://localhost:3000`

| Method | Endpoint       | Description                                         |
| ------ | -------------- | --------------------------------------------------- |
| GET    | `/`            | Returns all registered users.                       |
| POST   | `/signin`      | Authenticates user credentials.                     |
| POST   | `/register`    | Registers a new user.                               |
| GET    | `/profile/:id` | Retrieves a user profile by ID.                     |
| PUT    | `/image`       | Updates user submission count.                      |
| POST   | `/imageurl`    | Interacts with the Clarifai API for face detection. |

### What I learned

- Building a RESTful API with Node.js and Express.  
- Using Knex.js to simplify database queries.  
- Managing sensitive data securely with dotenv.  
- Integrating third-party APIs like Clarifai for AI-based functionalities.  
- Using middleware like cors to handle cross-origin requests effectively.
- Designing and interacting with relational databases using PostgreSQL.

Here’s an example of the handleSignin function used for validating user credentials and logging in:

```js
const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('unable to get user'));
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'));
};

module.exports = {
  handleSignin
};
```

This function:
- Validates the email and password provided in the request.
- Compares the password with the stored hash using bcrypt.
- Retrieves and returns user data if the credentials are valid.

### Setup Instructions

#### Prerequisites

- Node.js installed on your machine.
- PostgreSQL installed and configured with a database for the app.
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
3. Create a `.env` file in the root directory and add your Clarifai API key:
```makefile
CLARIFAI_API_KEY=your_api_key_here
```
4. Update `db-config` with your PostgreSQL database credentials.

#### Running the Server

1. Start the server:
```bash
npm start
```
2. The API will run locally on `http://localhost:3000`.

Note: Ensure that your PostgreSQL database is set up and seeded with the necessary tables before starting the server.

### Useful resources

- [Express Documentation](https://expressjs.com/) - Learn more about building APIs with Express. 
- [Knex.js Documentation](https://knexjs.org/) - A guide to using Knex.js for SQL queries. 
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Detailed PostgreSQL database management instructions. 
- [Clarifai API Documentation](https://docs.clarifai.com/) - Learn to integrate the Clarifai API
- [NPM: dotenv Documentation](https://www.npmjs.com/package/dotenv) - Securely manage environment variables. 

## Author

- GitHub - [@dantvi](https://github.com/dantvi)
- LinkedIn - [@danieltving](https://www.linkedin.com/in/danieltving/)

## Acknowledgments

Special thanks to Zero To Mastery for providing a comprehensive and practical learning experience. A heartfelt thanks to Andrei Neagoie, whose clear explanations and focus on real-world projects made learning backend development both accessible and enjoyable. Additionally, platforms like MDN Web Docs and Stack Overflow were instrumental in resolving challenges and deepening understanding throughout the project.
