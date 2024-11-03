const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const toggleUserButton = document.getElementById('toggle-user');
const currentUserDisplay = document.getElementById('current-user');

// Função para alternar entre User A e User B
function toggleUser() {
  const currentUser = localStorage.getItem('currentUser') || 'User A';
  const newUser = currentUser === 'User A' ? 'User B' : 'User A';
  localStorage.setItem('currentUser', newUser);
  currentUserDisplay.textContent = `Current User: ${newUser}`;
  toggleUserButton.textContent = `Switch to ${currentUser}`;
}

// Inicializar usuário atual
if (!localStorage.getItem('currentUser')) {
  localStorage.setItem('currentUser', 'User A');
}
currentUserDisplay.textContent = `Current User: ${localStorage.getItem('currentUser')}`;
toggleUserButton.addEventListener('click', toggleUser);

// Carregar tarefas do armazenamento local
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
    completedBy: []
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
  const currentUser = localStorage.getItem('currentUser');

  // Verificar se o usuário atual já marcou a tarefa
  if (!task.completedBy.includes(currentUser)) {
    task.completedBy.push(currentUser);
    if (task.completedBy.length === 2) {
      alert(`Tarefa "${task.text}" concluída por ambos os usuários!`);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
}

// Carregar tarefas na inicialização
loadTasks();
