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
  deleteTodo: function() {
    var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
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

      todoLi.textContent = todoTextWithCompletion;
      todosUl.appendChild(todoLi);
    }
  }
}