const express = require("express");
const mysql = require("mysql2");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "nabiapc",
    database: "task_manager_db",
    port: "3306"
});

connection.connect(err => {
    if (err) throw err;
    console.log("connected to MySQL!")
});

app.get('/tasks', (req,res)=>{
    const sql="SELECT * FROM tasks OR ORDER BY created_at DESC";

    connection.query(sql,(err, results)=>{
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/tasks', (req,res)=>{
    const {title, description, priority, due_date} = req.body;

    const id = uuidv4();

    const sql = "INSERT INTO tasks (id, title, description, priority, due_date)  VALUES (?, ?, ?, ?, ?)";
    const values = [taskId, "Finish Project", "Complete the Node.js task manager project", 
        "HIGH", "2025-12-31 23:59:59"];
    connection.query(sql,[id, title, description, priority, due_date],
        (err,results)=> {
            if (err) return res.status(400).send(err);
            res.json({message: "Task Created!", taskId:id});
        });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});