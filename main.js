"use strict"

document.getElementById('tasksList').addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON' && event.target.name === 'buttonDelete') {
    event.target.closest('li').remove();
    saveTasksToLocalStorage();
    return;
  }
  if (event.target.tagName === 'BUTTON' && event.target.name === 'buttonEdit') {
    const textElement = event.target.closest('li').querySelector('.task-text');
    const newText = prompt('Напишите новое название задачи:', textElement.textContent);
    if (newText !== null && newText.trim() !== '') {
      textElement.textContent = newText.trim();
    }
    saveTasksToLocalStorage();
    return;
  }
  if (event.target.closest('.check') || event.target.classList.contains('check')) {
    const li = event.target.closest('li');
    const checkbox = li.querySelector('.task-checkbox');
    checkbox.checked = !checkbox.checked;
    li.classList.toggle('done', checkbox.checked);
    saveTasksToLocalStorage();
    return;
  }
})
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
})
const addTask = () => {
  if (document.getElementById('inputTask').value.trim() === '') {
    alert('Поле пустое');
    return;
  }
  const tasks = document.getElementById('tasksList');
  for (const el of tasks.children) {
    if (el.querySelector('.task-text').textContent.trim().toLowerCase() === document.getElementById('inputTask').value.trim().toLowerCase()) {
      alert('Такая задача уже есть');
      return;
    }
  }
  const newTask = document.createElement('li');
  const dateTime = new Date();
 newTask.innerHTML = `
    <div class="check-done">
      <input type="checkbox" class="task-checkbox">
      <label class="check">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </div>
    <div class="task-content">
      <div class="task-text">${document.getElementById('inputTask').value}</div>
      <div class="task-time">${dateTime.toLocaleTimeString()}, ${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}</div>
    </div>
    <div class="task-actions">
      <button type="button" name="buttonEdit">✏️</button>
      <button type="button" name="buttonDelete">🗑️</button>
    </div>`;
  tasks.appendChild(newTask);
  document.getElementById('inputTask').value = '';
  saveTasksToLocalStorage();
}
const addSavedTasks = (task) => {
  const tasksList = document.getElementById('tasksList');
  const newTask = document.createElement('li');
  if (task.done) {
    newTask.classList.add('done');
  }
  newTask.innerHTML = `
    <div class="check-done">
    <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''}>
    <label class="check">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>
                        </label>
    </div>
    <div class="task-content">
        <div class="task-text">${task.text}</div>
        <div class="task-time">${task.time[0]}, ${task.time[1]}/${task.time[2]}/${task.time[3]}</div>
    </div>
    <div class="task-actions">
        <button type="button" name="buttonEdit">✏️</button>
        <button type="button" name="buttonDelete">🗑️</button>
    </div>`;
  tasksList.appendChild(newTask);
} 
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('todoTasks');
  if (!savedTasks) {
    return;
  }
  const tasks = JSON.parse(savedTasks);
  tasks.forEach(task => addSavedTasks(task))
}
const saveTasksToLocalStorage = () => {
  const tasks = [];
  document.querySelectorAll('#tasksList li').forEach(li => {
    const timeString = li.querySelector('.task-time').textContent;
    let timePart = '', datePart = '';
    [timePart, datePart] = timeString.split(', ');
    tasks.push({
      text: li.querySelector('.task-text').textContent,
      done: li.classList.contains('done'),
      time: [timePart, ...datePart.split('/')]
    })
  })
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}
