const third = document.querySelector(".third");
const allBTN = document.querySelector(".all");
const activeBTN = document.querySelector(".active");
const completedBTN = document.querySelector(".completed");
const btn = document.querySelector(".add");
const mainInput = document.querySelector(".details");
const TASKS_KEY = "task";
const arr = [];
const tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || arr;

activeBTN.addEventListener("click", () => {
   window.location.href = "page2.html";
});

completedBTN.addEventListener("click", () => {
   window.location.href = "page3.html";
});

renderTasks();

btn.addEventListener("click", (e) => {
   e.preventDefault;
   const taskText = mainInput.value.trim();
   if (taskText !== "") {
      tasks.push({ id: Math.round(Math.random() * 100000000), text: taskText, done: false });
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      renderTasks();
      mainInput.value = "";
   }
});

third.addEventListener("change", (e) => {
   if (e.target.type === "checkbox") {
      const taskIndex = e.target.dataset.index;
      tasks[taskIndex].done = e.target.checked;
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
   }
});

function renderTasks() {
   third.innerHTML = "";
   tasks.forEach((task, i) => {
      const newInput = document.createElement("input");
      newInput.type = "checkbox";
      newInput.checked = task.done;
      newInput.dataset.index = i;
      const newLabel = document.createElement("label");
      newLabel.textContent = task.text;
      newLabel.setAttribute("for", newInput.id);
      third.appendChild(newInput);
      third.appendChild(newLabel);
   });
}
