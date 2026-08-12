function setLayout(isGrid) {
    const grid = document.querySelector(".grid");
    grid.style.display = isGrid ? "grid" : "flex";
    grid.style.flexDirection = isGrid ? null : "column";
    document.querySelector("#grid-layout").setAttribute("src", "/images/" + ((isGrid) ? "grid-2" : "grid-4") + ".svg");
}

async function toggleLayout() {
    let isGrid = await fetch("/toggleLayout");
    isGrid = await isGrid.json();
    setLayout(isGrid);
}

function setTheme(isLightMode) {
    const theme = document.querySelector("#theme-mode");
    if (isLightMode) {
        theme.setAttribute("src", "/images/moon.svg");
        document.querySelector(".profile-pic").setAttribute("src", "/images/task-logo.svg");
    } else {
        theme.setAttribute("src", "/images/sun.svg");
        document.querySelector(".profile-pic").setAttribute("src", "/images/task-logo-dark.svg");
    }
}

async function toggleTheme() {
    let isLightMode = await fetch("/toggleTheme");
    isLightMode = await isLightMode.json();
    document.body.classList.toggle("dark");
    setTheme(isLightMode);
}

async function setCurrentThemeLayout() {
    let iscurGrid = await fetch("/curGridLayout");
    iscurGrid = await iscurGrid.json();
    let isCurLightMode = await fetch("/curLightTheme");
    isCurLightMode = await isCurLightMode.json();
    if (!isCurLightMode) {
        document.body.classList.toggle("dark");
    }
    setLayout(iscurGrid);
    setTheme(isCurLightMode);
}

function renderTasks(tasks) {
    ["ui", "nui", "uni", "nuni"].forEach(id => {
        document.getElementById(id).innerHTML = "";
    });

    tasks.forEach(task => {
        appendTaskToDOM(task);
    });
}

function setActiveSpace(space) {
    document.querySelectorAll(".spaces").forEach(el => {
        el.classList.toggle("currentSpace", el.dataset.space === space);
    });
}

function removeTaskFromDOM(id) {
    const el = document.querySelector(`[data-task-id="${id}"]`);
    if (el) el.remove();
}

function appendTaskToDOM(task) {
    const container = document.getElementById(task.priority);
    if (!container) return;

    const el = document.createElement("div");
    el.className = "task";
    el.dataset.taskId = task.id;

    el.innerHTML = `
        <span>
            <strong>${task.title}</strong>
            <small>${task.dueDate}</small>
        </span>
        <button class="edit" data-id="${task.id}">
            <img class="mod-img" src="/images/edit.svg" alt="edit logo">
        </button>
        <button class="delete" data-id="${task.id}">
            <img class="mod-img" src="/images/delete.svg" alt="delete logo">
        </button>
    `;

    container.appendChild(el);

    el.querySelector(".delete").addEventListener("click", async () => {
        const res = await fetch(`/tasks/${task.id}`, { method: "DELETE" });
        if (res.ok) {
            removeTaskFromDOM(id);
        }
    });

    el.querySelector(".edit").addEventListener("click", () => {
        window.location.href = `/tasks/patch?id=${task.id}`;
    });
}

setCurrentThemeLayout();

const spaces = document.querySelectorAll(".spaces");
for (let i = 0; i < spaces.length; i++) {
    spaces[i].addEventListener("click", async () => {
        const space = spaces[i].dataset.space;
        const res = await fetch(`/api/space/${space}`)
        const { tasks } = await res.json();
        renderTasks(tasks);
        setActiveSpace(space);
    });
}

// const edit = document.querySelectorAll(".edit");
// for (let i = 0; i < edit.length; i++) {
//     edit[i].addEventListener("click", async () => {
//         const id = edit[i].getAttribute("id");
//         window.location.href = `/tasks/patch?id=${id}`;
//     });
// }

// const deleteT = document.querySelectorAll(".delete");
// for (let i = 0; i < deleteT.length; i++) {
//     deleteT[i].addEventListener("click", async () => {
//         const id = deleteT[i].getAttribute("id");
//         const res = await fetch(`/tasks/${id}`, { method: "DELETE" });
//         if (res.ok) {
//             removeTaskFromDOM(id);
//         }
//     });
// }

document.getElementById("addTask").addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskText = document.getElementById("taskText").value;
    const dueDate = document.getElementById("dueDate").value;
    const quadrant = document.getElementById("taskQuadrant").value;

    const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: taskText,
            dueDate: dueDate,
            priority: quadrant
        })
    });

    if (res.ok) {
        const task = await res.json();
        appendTaskToDOM(task);
        e.target.reset();
    } else {
        alert("Failed to add task");
    }
});