const express = require("express");
const app = express();

const PORT = 5001;

app.get("/", (req,res) => {
    res.send("Hello Class CSE120");
})

app.listen(PORT, () =>{
    console.log("Server Started on:" + PORT);
})