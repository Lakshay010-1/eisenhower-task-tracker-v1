// import express from "express";
// import bodyParser from "body-parser";

// const port = 8888;
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// let isGrid = true;
// let isLightMode = true;
// const tasks = [];
// const spaces = new Set();
// let currentSpace = "Primary";
// spaces.add(currentSpace);

// app.get("/tasks", (req, res) => {
//     res.json(tasks);
// });
// app.get("/curSpace", (req, res) => {
//     res.json(currentSpace);
// });
// app.get("/spaces", (req, res) => {
//     res.json(Array.from(spaces));
// });
// app.get("/toggleGrid", (req,res)=>{
//     isGrid=!isGrid;
//     res.json(isGrid);
// });
// app.get("/toggleLightMode", (req,res)=>{
//     isLightMode=!isLightMode;
//     res.json(isLightMode);
// });
// app.get("/curGridLayout", (req,res)=>{
//     res.json(isGrid);
// });
// app.get("/curThemeMode", (req,res)=>{
//     res.json(isLightMode);
// });
// app.get("/tasks/priority/:priority", (req, res) => {
//     const priority = req.params.priority;
//     const priorityTask = tasks.filter(task => task.priority === priority);
//     res.json(priorityTask);
// });
// app.get("/tasks/id/:id", (req, res) => {
//     const id = req.params.id;
//     const task = tasks.find(task => task.id === parseInt(id));
//     if (!task) {
//         return res.status(404).json({ "message": "task not found" });
//     }
//     res.json(task);
// });
// app.get("/tasks/space/:space", (req, res) => {
//     const space = req.params.space;
//     const spaceTasks = tasks.filter(task => task.space === space);
//     res.json(spaceTasks);
// });


// app.post("/tasks", (req, res) => {
//     const id = Date.now();
//     const space = currentSpace;
//     const { title, dueDate, priority } = req.body;
//     const task = {
//         id, title, dueDate, priority, space
//     };
//     tasks.push(task);
//     res.status(201).json(task);
// });
// app.post("/spaces", (req, res) => {
//     const { space } = req.body;
//     currentSpace = space;
//     let spaceExist = false;
//     for (let s of spaces) {
//         if (space === s) {
//             spaceExist = true;
//         }
//     }
//     if (!spaceExist) {
//         spaces.add(currentSpace);
//     }
//     res.status(201).json(currentSpace);
// });

// app.patch("/tasks/id/:id", (req, res) => {
//     const id = req.params.id;
//     const task = tasks.find((t) => t.id === parseInt(id));
//     if (!task) {
//         return res.status(404).json({ "message": "task not found" });
//     }
//     if (req.body.title) {
//         task.title = req.body.title;
//     }
//     if (req.body.dueDate) {
//         task.dueDate = req.body.dueDate;
//     }
//     if (req.body.priority) {
//         task.priority = req.body.priority;
//     }
//     res.status(200).json(task);
// });

// app.delete("/tasks/id/:id", (req, res) => {
//     const id = req.params.id;
//     let index = tasks.findIndex((task) => task.id === parseInt(id));
//     if (index !== -1) {
//         tasks.splice(index, 1);
//         return res.status(200).json({ "message": "Task successfully deleted" });
//     }
//     res.status(404).json({ message: "Task not found" });
// });


// app.listen(port, () => {
//     console.log(`Hosted at http://localhost:${port}`);
// });