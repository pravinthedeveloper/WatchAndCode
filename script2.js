var todoList = {
  todos: [],
  addTodo: function(todo) {
    this.todos.push({
      todoText: todo,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    // if all are completed, then make all false
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      } 
    } 
  }
};

var handlers = {
  addToDo: function() {
    var addTodoTextInput = document.getElementById('todoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoNewValueInput = document.getElementById('changeTodoNewValueInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoNewValueInput.value);
    changeTodoPositionInput.value = '';
    changeTodoNewValueInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleTodo: function() {
    var toggleCompletedTodoPositionInput = document.getElementById("toggleCompletedTodoPositionInput");
    todoList.toggleCompleted(toggleCompletedTodoPositionInput.valueAsNumber);
    toggleCompletedTodoPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    for (var i=0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todos = todoList.todos[i];
      var todoTextWithCompletion = '';

      if (todos.completed === true) {
        todoTextWithCompletion = '(x) ' + todos.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todos.todoText;
      }

      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
    var elementClicked = event.target;

    if (elementClicked.className === 'deleteButton') {
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
    });
  }
}

view.setUpEventListeners();