// Add event listeners to the "View Code" buttons
document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const codeCard = e.target.closest('.code-card');
        const codeId = codeCard.dataset.id;
        
        // Navigate to the details page with the code ID
        window.location.href = `./code-details.html?id=${codeId}`;
      });
    });
  });
  
  // Create the code details page content
  function createCodeDetailsPage() {
    // Get the code ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const codeId = urlParams.get('id');
  
    // Map numeric IDs to actual keys in codeData
    const idMap = {
      "1": "counter",
      "2": "todo",
      "3": "gallery"
    };
  
    const codeKey = idMap[codeId];
  
    const appContainer = document.getElementById('app-container');
  
    if (!codeKey) {
      appContainer.innerHTML = '<div class="error-message">Code ID not found</div>';
      return;
    }
  
    fetchCodeDetails(codeKey)
      .then(codeDetails => {
        renderCodeDetailsPage(codeDetails, appContainer);
        setupTabFunctionality();
        if (window.hljs) {
          hljs.highlightAll();
        }
      })
      .catch(error => {
        appContainer.innerHTML = `<div class="error-message">Error loading code: ${error.message}</div>`;
      });
  }
  
  
  // Simulate fetching code details (in a real app, this would be an API call)
  function fetchCodeDetails(codeId) {
    // Sample code data for demonstration
    const codeData = {
      counter: {
        title: "Interactive Counter",
        description: "",
        html: `<div class="counter-example">
    <div class="counter-display">0</div>
    <div class="counter-buttons">
      <button class="counter-btn decrease">-</button>
      <button class="counter-btn increase">+</button>
    </div>
  </div>`,
        css: `.counter-example {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    border:1px solid transparent;
    border-radius:1rem;
    background-color: rgba(105, 104, 104, 0.482);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  
  .counter-display {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #4895ef;
    transition: all 0.3s ease;
  }
  
  .counter-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .counter-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: #4895ef;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  
  .counter-btn:hover {
    transform: scale(1.1);
    background-color: darkblue;
  }
  
  .counter-btn:active {
    transform: scale(0.95);
  }`,
        js: `// Counter functionality
  const counterDisplay = document.querySelector('.counter-display');
  const decreaseBtn = document.querySelector('.counter-btn.decrease');
  const increaseBtn = document.querySelector('.counter-btn.increase');
  let count = 0;
  
  function updateCounter() {
    counterDisplay.textContent = count;
    
    // Add animation effect
    counterDisplay.classList.add('animated');
    setTimeout(() => {
      counterDisplay.classList.remove('animated');
    }, 300);
  }
  
  decreaseBtn.addEventListener('click', () => {
    count--;
    updateCounter();
  });
  
  increaseBtn.addEventListener('click', () => {
    count++;
    updateCounter();
  });`
      },
      todo: {
        title: "Advanced Todo App",
        description: "",
        html: `<div class="todo-app">
    <div class="todo-header">
      <input type="text" class="todo-input" placeholder="Add a new task..." >
      <button class="todo-add-btn">Add</button>
    </div>
    <ul class="todo-list">
      <li class="todo-item">
        <input type="checkbox" class="todo-checkbox">
        <span class="todo-text">Complete the project</span>
        <button class="todo-delete">×</button>
      </li>
      <li class="todo-item todo-completed">
        <input type="checkbox" class="todo-checkbox" checked>
        <span class="todo-text">Design the UI</span>
        <button class="todo-delete">×</button>
      </li>
    </ul>
  </div>`,
        css: `.todo-app {
    max-width: 500px;
    margin: 0 auto;
    background-color: rgba(105, 104, 104, 0.482); 
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(190, 190, 190, 0.44);
  }
  
  .todo-header {
    display: flex;
    margin-bottom: 1rem;
  }
  
  .todo-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid gray;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
    background-color: rgba(159, 159, 159, 0.48); 
    color:white;
  }
  
  .todo-add-btn {
    padding: 0.75rem 1rem;
    background-color: #4895ef;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-weight: bold;
  }
  
  .todo-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid var(--border-color);
    animation: fadeIn 0.3s ease;
  }
  
  .todo-checkbox {
    margin-right: 0.75rem;
  }
  
  .todo-text {
    flex: 1;
    color: white;
  }
  
  .todo-completed .todo-text {
    text-decoration: line-through;
    color: var(--text-secondary-color);
  }
  .todo-input::placeholder {
  color: white;
  opacity: 0.5; /* ensures it's fully visible */
}

  .todo-delete {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  
  .todo-delete:hover {
    opacity: 1;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }`,
        js: `// Todo App Functionality
  const todoInput = document.querySelector('.todo-input');
  const todoAddBtn = document.querySelector('.todo-add-btn');
  const todoList = document.querySelector('.todo-list');
  
  // Load todos from local storage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
  // Render todos
  function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');
      if (todo.completed) {
        todoItem.classList.add('todo-completed');
      }
      
      todoItem.innerHTML = \`
        <input type="checkbox" class="todo-checkbox" \${todo.completed ? 'checked' : ''}>
        <span class="todo-text">\${todo.text}</span>
        <button class="todo-delete">×</button>
      \`;
      
      // Add event listeners
      const checkbox = todoItem.querySelector('.todo-checkbox');
      checkbox.addEventListener('change', () => {
        toggleTodo(index);
      });
      
      const deleteBtn = todoItem.querySelector('.todo-delete');
      deleteBtn.addEventListener('click', () => {
        deleteTodo(index);
      });
      
      todoList.appendChild(todoItem);
    });
    
    // Save to local storage
    saveTodos();
  }
  
  // Add new todo
  function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
      todos.push({
        text,
        completed: false
      });
      todoInput.value = '';
      renderTodos();
    }
  }
  
  // Toggle todo completion status
  function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }
  
  // Delete todo
  function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
  }
  
  // Save todos to local storage
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  // Event listeners
  todoAddBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });
  
  // Initial render
  renderTodos();`
      }
    };
    
    return Promise.resolve(codeData[codeId] || Promise.reject(new Error('Code not found')));
  }
  
  // Render the code details page
  function renderCodeDetailsPage(codeDetails, container) {
    document.title = `${codeDetails.title} | Code Details`;
    
    // Create the main content container
    const mainContent = document.createElement('div');
    mainContent.classList.add('code-details-container');
    
    // Set the inner HTML with the details
    mainContent.innerHTML = `
      <header class="details-header">
        <div class="container">
          <div class="header-content">
            <a href="CodeList.html" class="back-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
              Back to List
            </a>
            <h1 class="details-title">${codeDetails.title}</h1>
          </div>
        </div>
      </header>
      
      <main class="details-main">
        <div class="container">
          <p class="details-description">${codeDetails.description}</p>
          
          <div class="code-tabs">
            <div class="tab-buttons">
              <button class="tab-btn active" data-tab="html">HTML</button>
              <button class="tab-btn" data-tab="css">CSS</button>
              <button class="tab-btn" data-tab="js">JavaScript</button>
            </div>
            
            <div class="tab-contents">
              <div class="tab-content active" id="html-content">
                <pre><code class="language-html">${escapeHtml(codeDetails.html)}</code></pre>
              </div>
              <div class="tab-content" id="css-content">
                <pre><code class="language-css">${escapeHtml(codeDetails.css)}</code></pre>
              </div>
              <div class="tab-content" id="js-content">
                <pre><code class="language-javascript">${escapeHtml(codeDetails.js)}</code></pre>
              </div>
            </div>
          </div>
          
          <div class="live-preview">
            <h2>Live Preview</h2>
            <div class="preview-container">
              <div id="preview-frame"></div>
            </div>
          </div>
        </div>
      </main>
    `;
    
    // Clear the container and append the new content
    container.innerHTML = '';
    container.appendChild(mainContent);
    
    // Set up the live preview
    const previewFrame = document.getElementById('preview-frame');
    previewFrame.innerHTML = codeDetails.html;
    
    // Create and append style element for the preview
    const styleElement = document.createElement('style');
    styleElement.textContent = codeDetails.css;
    document.head.appendChild(styleElement);
    
    // Execute JS code for the preview
    try {
      const scriptElement = document.createElement('script');
      scriptElement.textContent = codeDetails.js;
      document.body.appendChild(scriptElement);
    } catch (error) {
      console.error('Error executing code:', error);
      
      // Show error in preview
      const errorDisplay = document.createElement('div');
      errorDisplay.classList.add('preview-error');
      errorDisplay.textContent = `JavaScript Error: ${error.message}`;
      previewFrame.appendChild(errorDisplay);
    }
  }
  
  // Setup tab functionality
  function setupTabFunctionality() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.dataset.tab;
        document.getElementById(`${tabId}-content`).classList.add('active');
      });
    });
  }
  
  // Helper function to escape HTML
  function escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }