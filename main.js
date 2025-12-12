"use strict"

document.getElementById('tasksList').addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON' && event.target.name === 'buttonDelete') {
    event.target.closest('li').remove();
    return;
  }
  if (event.target.tagName === 'BUTTON' && event.target.name === 'buttonEdit') {
    const textElement = event.target.closest('li').querySelector('.task-text');
    const newText = prompt('Напишите новое название задачи:', textElement.textContent);
    if (newText !== null && newText.trim() !== '') {
      textElement.textContent = newText.trim();
    }
    return;
  }
  if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN') {
    const li = event.target.closest('li');
    li.classList.toggle('done');
  }
})
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  setInterval(saveTasksToLocalStorage, 5000);
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
  newTask.innerHTML = `
    <span class="task-text">${document.getElementById('inputTask').value}</span>
    <div class="task-actions">
        <button type="button" name="buttonEdit">✏️</button>
        <button type="button" name="buttonDelete">🗑️</button>
    </div>`;
  tasks.appendChild(newTask);
  document.getElementById('inputTask').value = '';
}
const addSavedTasks = (task) => {
  const tasksList = document.getElementById('tasksList');
  const newTask = document.createElement('li');
  if (task.done) {
    newTask.classList.add('done');
  }
  newTask.innerHTML = `
    <span class="task-text">${task.text}</span>
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
    tasks.push({
      text: li.querySelector('.task-text').textContent,
      done: li.classList.contains('done')
    })
  })
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}
