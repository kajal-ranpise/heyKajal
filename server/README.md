# Server Documentation

This is the server-side of the MERN application that manages user profiles. It is built using Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the server directory:
   ```
   cd my-mern-app/server
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Server

To start the server, run the following command:
```
npm start
```
The server will run on `http://localhost:5000` by default.

### API Endpoints

- `GET /api/profiles`: Retrieve all profiles.
- `GET /api/profiles/:id`: Retrieve a specific profile by ID.
- `POST /api/profiles`: Create a new profile.
- `PUT /api/profiles/:id`: Update an existing profile by ID.
- `DELETE /api/profiles/:id`: Delete a profile by ID.

### Folder Structure

- **controllers**: Contains the logic for handling requests related to profiles.
- **models**: Defines the Mongoose model for profiles.
- **routes**: Contains the API routes for profile-related requests.
- **server.js**: The main entry point for the server application.

### License

This project is licensed under the MIT License. See the LICENSE file for details.