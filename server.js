const express = require("express");
const app = express();

const PORT = 5001;

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("index");
})

app.get("/admin", (req, res) => {
	res.render("admin");
})

app.get("/book", (req, res) => {
	res.render("book");
})

app.get("/tenis", (req, res) => {
	res.render("tennis");
})

app.get("/edit_book", (req, res) => {
	res.render("edit_book");
})

app.get("/edit_tennis", (req, res) => {
	res.render("edit_tennis");
})


app.get('/login', (req, res)=>{
	res.render('login');
})

app.listen(PORT, () =>{
    console.log("Server Started on:" + PORT);
})