
const express = require("express");

const app = express();

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my Express server!");
});

// About route
app.get("/about", (req, res) => {
    res.status(200).json({
        name: "Adepu Meghana",
        section: "S-15"
    });
});

// Time route
app.get("/time", (req, res) => {
    res.status(200).send(new Date().toString());
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});

// Start the server
app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});
