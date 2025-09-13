import { persist, load } from "./utils.js";

const KEY = "grades";
const state = { grades: load(KEY, []) };

function addGrade(n) {
  if (Number.isFinite(n) && n >= 1 && n <= 6) {
    state.grades.push({ id: Date.now(), value: n });
    persist(KEY, state.grades);
    render();
    return true;
  } else return false;
}

function removeGrade(id) {
  state.grades = state.grades.filter((g) => g.id !== id);
  persist(KEY, state.grades);
  render();
}

function clearAll() {
  // nazwa ujednolicona
  state.grades = [];
  persist(KEY, []);
  render();
}

function render() {
  const list = document.getElementById("list");
  const avgEl = document.getElementById("avg");

  list.innerHTML = state.grades.length
    ? state.grades
        .map(
          (g) => `<li data-id="${g.id}">
             ${g.value} <button data-del="${g.id}">x</button>
           </li>`
        )
        .join("")
    : "<li>Brak ocen</li>";

  const len = state.grades.length;
  const avg = len
    ? +(state.grades.reduce((a, g) => a + g.value, 0) / len).toFixed(1)
    : 0;
  avgEl.textContent = `Średnia: ${avg.toFixed(1)}`;
}

// zdarzenia
document.getElementById("add").onclick = () => {
  const input = document.getElementById("grade");
  addGrade(Number(input.value));
  input.value = "";
};
document.getElementById("clear").onclick = clearAll;
document.getElementById("list").onclick = (e) => {
  const id = Number(e.target.dataset.del);
  if (id) removeGrade(id);
};

// początkowe renderowanie
render();
