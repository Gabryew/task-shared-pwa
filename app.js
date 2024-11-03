const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Função para carregar tarefas do armazenamento local
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    const completeButton = document.createElement('button');
    completeButton.textContent = task.completedBy.length === 2 ? '✅' : '❌';
    completeButton.onclick = () => toggleTaskCompletion(task.id);
    taskItem.appendChild(completeButton);
    taskList.appendChild(taskItem);
  });
}

// Adicionar nova tarefa
taskForm.onsubmit = (e) => {
  e.preventDefault();
  const newTask = {
    id: Date.now(),
    text: taskInput.value,
    completedBy: []  // Lista de usuários que marcaram a tarefa
  };
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';
  loadTasks();
};

// Marcar tarefa como concluída (precisa de dois usuários)
function toggleTaskCompletion(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const task = tasks.find(t => t.id === taskId);
  if (!task.completedBy.includes('User A')) {
    task.completedBy.push('User A');
  } else if (!task.completedBy.includes('User B')) {
    task.completedBy.push('User B');
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

// Carregar tarefas na inicialização
loadTasks();
