angular
    .module('app')
    .controller('HomeController', HomeController);

function HomeController() {
    var vm = this;
    vm.whatever = 4;
    // variables
    vm.orderByTodoStartingByA = false;
    vm.orderByPriorityStartingByA = false;
    vm.todos = [{
            "todo": 'Be happy',
            "priority": 'High',
            "done": true
        },
        {
            "todo": 'Example 2',
            "priority": 'Low',
            "done": false
        },
        {
            "todo": 'Finish reading YDKJS',
            "priority": 'High',
            "done": false
        },
        {
            "todo": 'Eat',
            "priority": 'Low',
            "done": true
        }
    ];
    vm.priorities = [
        'Priority',
        'High',
        'Medium',
        'Low'
    ];

    vm.todoSpan = "Example";

    vm.selectedPriority = vm.priorities[0];

    // when user clicks submit button, add a new todo
    vm.click = function click() {
        if (vm.todo != undefined) {
            vm.newObject = createTodo(vm.todo, vm.selectedPriority);
            vm.todos.push(vm.newObject);
            vm.todo = undefined;
        }
    }

    function createTodo(todo, priority) {
        return {
            "todo": todo,
            "priority": priority
        };
    }

    // edit todo
    vm.editTodo = function(todo) {
        console.log("editing..." + todo);
        var elem = angular.element(document.getElementById('todoSpan'));
        elem.innerHTML = '<p>Hola mundo</p>';
        console.log(elem);
    }

    // order todo list by todo name
    vm.orderByTodo = function() {
        vm.orderByTodoStartingByA = !vm.orderByTodoStartingByA;

        vm.todos.sort(function(a, b) {
            var todoA = a.todo.toUpperCase();
            var todoB = b.todo.toUpperCase();

            if (vm.orderByTodoStartingByA) {
                if (todoA < todoB) return -1;
                if (todoA > todoB) return 1;
            } else {
                if (todoA < todoB) return 1;
                if (todoA > todoB) return -1;
            }
        });
    }

    // order todo list by todo priority
    vm.orderByPriority = function() {
        vm.orderByPriorityStartingByA = !vm.orderByPriorityStartingByA;

        vm.todos.sort(function(a, b) {
            var priorityA = a.priority.toUpperCase();
            var priorityB = b.priority.toUpperCase();

            if (vm.orderByPriorityStartingByA) {
                if (priorityA < priorityB) return -1;
                if (priorityA > priorityB) return 1;
            } else {
                if (priorityA < priorityB) return 1;
                if (priorityA > priorityB) return -1;
            }
        });
    }

    // delete todo from list
    vm.delete = function(index) {
        vm.todos.splice(index, 1);
    }

    // returns the pending todos count
    vm.pendingTodos = function(index) {
        return (vm.todos.filter(function(x) {
            return x.done == false;
        })).length;
    }

    vm.seeArray = function(index) {
        console.log(vm.todos);
    }
}
