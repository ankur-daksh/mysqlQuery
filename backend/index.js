import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookStore",
});



app.get("/booksAll", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.send({ code: 200, books: data })
  });
});
app.get("/search", (req, res) => {
  const q = `SELECT * FROM books WHERE title LIKE '%${req.query.value}%' `;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.send({ code: 200, books: data });
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `description`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/orders", (req, res) => {

  const { address,city,state,bookId} = req.body;
  const q = "INSERT INTO orders(`address`, `city`,`state`,`book_id`,`user_id`) VALUES (?)";
  let user_id='6388db03f21ce16341e8a0c7'

  const values = [
    address,
    city,
    state,
    bookId,
    user_id 
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});




app.listen(5000, () => {
  console.log("Connected to backend.");
});
