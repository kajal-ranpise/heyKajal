# My MERN App

This project is a MERN (MongoDB, Express, React, Node.js) application that allows users to manage their profiles. It consists of a client-side React application and a server-side Node.js application.

## 🚀 Tech Stack

### **Frontend**
- React.js
- Redux Toolkit
- JavaScript
- HTML5
- CSS3

### **Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

### **Tools**
- Git & GitHub
- VS Code
- npm
## Project Structure

```
my-mern-app
├── client          # React frontend
│   ├── public      # Public assets
│   ├── src         # Source code for the React app
│   ├── package.json # Client dependencies and scripts
│   └── README.md   # Client documentation
├── server          # Node.js backend
│   ├── src         # Source code for the Node.js app
│   ├── package.json # Server dependencies and scripts
│   └── README.md   # Server documentation
└── README.md       # Overall project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (running locally or using a cloud service)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-mern-app
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd server
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd client
   npm start
   ```

The client application will be available at `http://localhost:3000` and the server API will be available at `http://localhost:5000`.

### Features

- User profile management (create, read, update, delete)
- Redux Toolkit for state management in the React app
- RESTful API for handling profile data

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

Live Site Link - kajal-ranpise.github.io/My-Profile-Kajal


Deploy React App to GitHub Pages – Notes
1. Create React App
npx create-react-app my-app
cd my-app

2. Install gh-pages
npm install gh-pages --save-dev

3. Add homepage in package.json
"homepage": "https://<username>.github.io/<repo-name>"

theme - https://themewagon.github.io/Kelly/index.html
Example: "homepage": "https://kajal-ranpise.github.io/My-Profile-Kajal"

4. Update scripts in package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

5. Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main

6. Deploy
npm run deploy


Builds app

Pushes build to gh-pages branch

Live at: https://<username>.github.io/<repo-name>

7. (Optional) React Router

Wrap with basename:

<BrowserRouter basename={process.env.PUBLIC_URL}>
  <App />
</BrowserRouter>


✅ Done! Your React app is live on GitHub Pages.


//For send free email

https://formspree.io/register

pass - 4XHaMn4iwn#Neu6
