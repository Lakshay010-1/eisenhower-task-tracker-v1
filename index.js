const express = require("express");
const taskAPI = require("./apiInstance");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const spaces = taskAPI.spaces;
        const currentSpace = taskAPI.currentSpace;
        const tasks = taskAPI.getTasksBySpace(currentSpace);
        res.render("index.ejs", { tasks, spaces, currentSpace });
    } catch (e) {
        res.status(500).json({ "message": `Error fetching tasks` });
    }
});

app.get("/api/space/:space", async (req, res) => {
    const space = req.params.space;
    taskAPI.setSpace(space);
    const tasks = taskAPI.getTasksBySpace(space);
    res.json({ tasks, space });
});

app.get("/toggleLayout", async (req, res) => {
    try {
        const isGrid = taskAPI.toggleGrid();
        res.json(isGrid);
    } catch (e) {
        res.json({ "message": "Error toggling layout" });
    }
});
app.get("/curGridLayout", async (req, res) => {
    try {

        const isGrid = taskAPI.isGrid;
        res.json(isGrid);
    } catch (e) {
        res.json({ "message": "Error fetching current layout" });
    }
});
app.get("/toggleTheme", async (req, res) => {
    try {

        const isLightMode = taskAPI.toggleTheme();
        res.json(isLightMode);
    } catch (e) {
        res.json({ "message": "Error toggling theme" });
    }
});
app.get("/curLightTheme", async (req, res) => {
    try {

        const isLightMode = taskAPI.isLightMode;
        res.json(isLightMode);
    } catch (e) {
        res.json({ "message": "Error fetching current theme" });
    }
});

app.post("/space", async (req, res) => {
    const { space } = req.body;
    try {
        taskAPI.setSpace(space);
        res.redirect("/");
    } catch (e) {
        res.status(500).json({ "message": `Error creating space` });
    }
});

app.post("/tasks", async (req, res) => {
    const { title, dueDate, priority } = req.body;
    try {
        const task = taskAPI.addTask({ title, dueDate, priority });
        res.status(201).json(task);
    } catch (e) {
        res.status(500).json({ "message": `Error creating tasks` });
    }
});

app.get("/tasks/patch", async (req, res) => {
    const { id } = req.query;
    const task = taskAPI.getTaskById(Number(id));
    if (!task) {
        res.redirect("/");
    } else {

        res.render("editTask.ejs", { task });
    }
});

app.post("/tasks/patch", async (req, res) => {
    const { id, text, duedate, priority } = req.body;
    const updatedTask = taskAPI.updateTask(Number(id), { title: text, dueDate: duedate, priority });
    if (!updatedTask) {
        res.status(404).json({ message: "Task not found!" });
    }
    res.redirect("/");
});

app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const message = taskAPI.deleteTask(Number(id));
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ success: false });
    }
});


app.listen(PORT, () => {
    console.log(`application successfully started`);
});