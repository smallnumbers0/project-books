import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "bookslist",
    password: "mango0920",
    port: 5432,
})

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public")); //defaults to public folder

let items = [ { title: "The alchemist", rating: 8}, {title: "Test", rating: 7}];

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM books");
        items = result.rows;

        res.render("index.ejs", {
            booksTitle: "Hello World",
            booksItem: items,
        });
    } catch(err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});