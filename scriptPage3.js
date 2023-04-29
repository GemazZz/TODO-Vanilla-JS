const third = document.querySelector(".third");
const allBTN = document.querySelector(".all");
const activeBTN = document.querySelector(".active");
const completedBTN = document.querySelector(".completed");
const btn = document.querySelector(".add");
const mainInput = document.querySelector(".details");
const TASKS_KEY = "task";
const arr = [];
const tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || arr;
const dlt = document.querySelector(".delete");

allBTN.addEventListener("click", () => {
   window.location.href = "index.html";
});

activeBTN.addEventListener("click", () => {
   window.location.href = "page2.html";
});

dlt.addEventListener("click", () => {
   const checkedInputs = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
   checkedInputs.forEach((input) => {
      const taskId = input.id;
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      tasks.splice(taskIndex, 1);
      const label = document.querySelector(`label[for="${taskId}"]`);
      label.remove();
   });
   localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
   renderTasks();
});

renderTasks();

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
      newInput.id = task.id;
      newInput.checked = task.done;
      newInput.dataset.index = i;
      const newLabel = document.createElement("label");
      newLabel.textContent = task.text;
      newLabel.id = task.id;
      const clear = document.createElement("button");
      clear.classList = "clear";
      clear.id = task.id;
      clear.textContent = "clear";
      newLabel.setAttribute("for", newInput.id);
      third.appendChild(newInput);
      third.appendChild(newLabel);
      third.appendChild(clear);
      clear.addEventListener("click", () => {
         const taskId = clear.id;
         tasks.splice(i, 1);
         localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
         renderTasks();
      });
   });
}
