# BDF Lab 1 – Node.js and Express Server

**Deployment URL:** `ADD_YOUR_PUBLIC_DEPLOYMENT_URL_HERE`

## Student Details

- **Name:** Adepu Meghana
- **Registration Number:** 252U1R1001
- **Section:** S-15
- **Course:** Backend Development Fundamentals
- **Lab:** Lab 1 – Node.js and Express Server

## Project Description

This project demonstrates how to create a basic web server using Node.js and the built-in HTTP module, and how to create a web server using Express.js.

The Express server provides three API endpoints and returns a 404 response for unknown routes.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- npm

## Project Structure

```text
nodelab1/
├── http-server.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore  
├── README.md
└── screenshots/
    ├── home.png
    ├── about.png
    ├── time.png
    └── unknown.png
```

## Installation

1. Install Node.js and npm.
2. Clone this repository:

   ```bash
   git clone https://github.com/adepumeghana7116-eng/AdepuMeghana.git
   ```

3. Open the project folder in VS Code.
4. Open the terminal and run:

   ```bash
   npm install
   ```

This installs the dependencies listed in `package.json`. The `node_modules` folder is generated automatically.

## Execution

### 1. Run the basic HTTP server

```bash
node http-server.js
```

Open `http://localhost:3000` in your browser. The server should display `Welcome to my Express server!`.

Stop the server with `Ctrl + C` before running the next server.

### 2. Run the Express server

```bash
node server.js
```

The server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Expected Response |
|---|---|---|
| GET | `/` | Welcome message with status code 200 |
| GET | `/about` | JSON containing student name and section, status code 200 |
| GET | `/time` | Current date and time, status code 200 |
| GET | Any unknown path | 404 – Page Not Found |

## Screenshots

### 1. Home Endpoint – GET /

![Home endpoint screenshot](screenshots/home.png)

### 2. About Endpoint – GET /about

![About endpoint screenshot](screenshots/about.png)

### 3. Time Endpoint – GET /time

![Time endpoint screenshot](screenshots/time.png)

### 4. Unknown Route – 404 Response

![404 response screenshot](screenshots/unknown.png)

## Testing

The endpoints were tested by opening the URLs in a browser. The responses were checked to confirm that the routes return the expected content and status codes.

Additional Postman screenshots or a Postman collection can be included as testing evidence.

## Notes

- Install dependencies using `npm install`.
- Do not upload the `node_modules` folder to GitHub.
- Do not commit or share any `.env` file.
- The basic HTTP server and Express server both use port 3000, so run them one at a time.