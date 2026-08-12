class TaskAPI {
    constructor() {
        this.isGrid = true;
        this.isLightMode = true;
        this.tasks = [];
        this.spaces = new Set(["Primary"]);
        this.currentSpace = "Primary";
    }

    getTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(t => t.id === id);
    }

    getTasksByPriority(priority) {
        return this.tasks.filter(t => t.priority === priority);
    }

    getTasksBySpace(space) {
        return this.tasks.filter(t => t.space === space);
    }

    addTask({ title, dueDate, priority }) {
        const task = {
            id: Date.now(),
            title,
            dueDate,
            priority,
            space: this.currentSpace
        };
        this.tasks.push(task);
        return task;
    }

    updateTask(id, data) {
        const task = this.getTaskById(id);
        if (!task) return null;

        Object.assign(task, data);
        return task;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }

    toggleGrid() {
        this.isGrid = !this.isGrid;
        return this.isGrid;
    }

    toggleTheme() {
        this.isLightMode = !this.isLightMode;
        return this.isLightMode;
    }

    setSpace(space) {
        this.currentSpace = space;
        this.spaces.add(space);
        return space;
    }
}

module.exports=TaskAPI;