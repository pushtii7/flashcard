const express = require("express");
const path = require("path");
// const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const { createUserTable } = require("./model/userModel");
const { createFlashCardTable } = require("./model/flashcardModel");


app.use(cookieParser());
app.use(express.json());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true,
//     })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createUserTable();
createFlashCardTable();

const userRoutes = require("./routes/userRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
app.use("/api/v1", userRoutes);
app.use("/api/v1", flashcardRoutes);

app.use(express.static(path.join(__dirname, "dist")));
app.get("**", (req, res) => {
    return res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
