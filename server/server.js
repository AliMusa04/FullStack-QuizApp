const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require('./config/dbConfig')

const usersRoute = require('./routes/usersRoute');
const examsRoute = require('./routes/exmasRoute');

app.use('/api/users', usersRoute);
app.use("/api/exams", examsRoute);
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})