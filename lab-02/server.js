
const express = require("express");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbPath = "./books.db";

let db;

const initializeDBAndServer = async () => {
  try {
    db = await sqlite.open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

// GET all books
app.get("/books/", async (req, res) => {
  try {
    const books = await db.all("SELECT * FROM book");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET one book
app.get("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!/^[1-9]\d*$/.test(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const book = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [Number(bookId)]
    );

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new book
app.post("/books/", async (req, res) => {
  try {
    const { title, author, price, pages } = req.body;

    if (
      typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim() ||
      !Number.isInteger(price) || price < 0 ||
      !Number.isInteger(pages) || pages <= 0
    ) {
      return res.status(400).json({ error: "Invalid book data" });
    }

    const result = await db.run(
      `INSERT INTO book (title, author, price, pages)
       VALUES (?, ?, ?, ?)`,
      [title.trim(), author.trim(), price, pages]
    );

    const newBook = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [result.lastID]
    );

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a book
app.put("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, author, price, pages } = req.body;

    if (!/^[1-9]\d*$/.test(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    if (
      typeof title !== "string" || !title.trim() ||
      typeof author !== "string" || !author.trim() ||
      !Number.isInteger(price) || price < 0 ||
      !Number.isInteger(pages) || pages <= 0
    ) {
      return res.status(400).json({ error: "Invalid book data" });
    }

    const existingBook = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [Number(bookId)]
    );

    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    await db.run(
      `UPDATE book
       SET title = ?, author = ?, price = ?, pages = ?
       WHERE id = ?`,
      [title.trim(), author.trim(), price, pages, Number(bookId)]
    );

    const updatedBook = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [Number(bookId)]
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a book
app.delete("/books/:bookId/", async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!/^[1-9]\d*$/.test(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const existingBook = await db.get(
      "SELECT * FROM book WHERE id = ?",
      [Number(bookId)]
    );

    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    await db.run(
      "DELETE FROM book WHERE id = ?",
      [Number(bookId)]
    );

    res.status(200).json({
      message: "Book deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

initializeDBAndServer();
