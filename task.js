const express = require("express");
const mysql = require("mysql2");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nabiapc",
    database: task_manager_db
});