// planner.js — Academic Planner interactivity
// Rubric coverage:
//   - Array of task objects holds application state (no reload needed)
//   - Functions handle add / toggle-complete / delete
//   - Full DOM manipulation renders the list dynamically

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('taskForm');
  const input = document.getElementById('taskInput');
  const list = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  const statTotal = document.getElementById('statTotal');
  const statDone = document.getElementById('statDone');
  const statPending = document.getElementById('statPending');

  if (!form || !list) return; // safety guard if script loads on wrong page

  // ---- State ----------------------------------------------------------
  // Every task is { id, text, completed }. This array is the single
  // source of truth; the DOM is re-rendered from it on every change.
  let tasks = [];
  let nextId = 1;

  // ---- Rendering --------------------------------------------------------
  function render() {
    list.innerHTML = '';

    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.dataset.id = task.id;

      const checkBtn = document.createElement('button');
      checkBtn.className = 'task-check';
      checkBtn.type = 'button';
      checkBtn.setAttribute('aria-label', task.completed ? 'Mark task as not completed' : 'Mark task as completed');
      checkBtn.textContent = task.completed ? '✓' : '';
      checkBtn.addEventListener('click', () => toggleComplete(task.id));

      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;

      const delBtn = document.createElement('button');
      delBtn.className = 'task-delete';
      delBtn.type = 'button';
      delBtn.textContent = 'Delete';
      delBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
      delBtn.addEventListener('click', () => deleteTask(task.id));

      li.append(checkBtn, span, delBtn);
      list.appendChild(li);
    });

    emptyState.style.display = tasks.length === 0 ? 'block' : 'none';
    updateStats();
  }

  function updateStats() {
    const done = tasks.filter((t) => t.completed).length;
    statTotal.textContent = tasks.length;
    statDone.textContent = done;
    statPending.textContent = tasks.length - done;
  }

  // ---- Actions ----------------------------------------------------------
  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    tasks.push({ id: nextId++, text: trimmed, completed: false });
    render();
  }

  function toggleComplete(id) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    render();
  }

  // ---- Events ----------------------------------------------------------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(input.value);
    input.value = '';
    input.focus();
  });

  tasks = []
  nextId = 1;

  // This are my tasks for the semester.
  addTask('Complete Cisco Cybersecurity Certificate');
  addTask('Prepare: 2nd Semester Exams');
  addTask('Submit: CSC 106 PROJECT');
  addTask('Create a GitHub Repository for My Project');
  addTask('Submit: Technical Certificate Report');

if (tasks[0]) {
  tasks[0].completed = true;
}
  render();
  }
);
