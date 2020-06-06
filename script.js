var todoList = {
  todos: [],
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log('Your todolist is empty');
    } else {
      console.log('My Todos:');
      for (var i = 0; i < this.todos.length; i++) {
        //console.log(this.todos[i].todoText);

        if (this.todos[i].completed === true) {
          console.log('(x)', this.todos[i].todoText)
        } else {
          console.log('( )', this.todos[i].todoText)
        }

      }
    }
  },
  addTodo: function(todo) {
    this.todos.push({
      todoText: todo,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
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
   this.displayTodos();
  }
};

var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
    view.displayTodos();
  },
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