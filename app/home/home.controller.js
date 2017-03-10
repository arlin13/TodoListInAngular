angular
    .module('app')
    // add HomeController
    .controller('HomeController', HomeController)
    // add directive
    .directive('myEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.myEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });

function HomeController() {
    var vm = this;
    vm.whatever = 4;
    // variables
    vm.orderByTodoStartingByA = false;
    vm.orderByPriorityStartingByA = false;
    vm.todos = [];
    // Use this array to start list with todos (testing)
    // vm.todos = [{
    //         "todo": 'Be happy',
    //         "priority": 'High',
    //         "done": true,
    //         "editing": false
    //     },
    //     {
    //         "todo": 'Example 2',
    //         "priority": 'Low',
    //         "done": false,
    //         "editing": false
    //     },
    //     {
    //         "todo": 'Finish reading YDKJS',
    //         "priority": 'High',
    //         "done": false,
    //         "editing": false
    //     },
    //     {
    //         "todo": 'Eat',
    //         "priority": 'Low',
    //         "done": true,
    //         "editing": false
    //     }
    // ];
    vm.priorities = [
        'High',
        'Medium',
        'Low'
    ];

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
            "priority": priority,
            "done": false,
            "editing": false
        };
    }

    // edit todo
    vm.editTodo = function(todo) {
        console.log("editing..." + todo);
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
}
