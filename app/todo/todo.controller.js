(function() {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['todoFactory'];

    /* @ngInject */
    function TodoController(todoFactory) {
        var vm = this;

        // VARIABLES
        {
            vm.orderByTodoStartingByA = false;
            vm.orderByPriorityStartingByA = false;
            vm.todos = [];
            vm.priorities = [
                'High',
                'Medium',
                'Low'
            ];

            vm.selectedPriority = vm.priorities[0];
        }

        // ACTIVATE
        {
            activate();

            function activate() {
                todoFactory
                    .getAll()
                    .then(function(data) {
                        vm.todos = data;
                    });
            }
        }

        // FUNCTIONS
        {
            // ADD
            {
                vm.click = function click() {
                    if (vm.text != undefined) {
                        var newTodo = createTodo(vm.text, vm.selectedPriority);
                        todoFactory
                            .create(newTodo)
                            .then(function(data) {
                                vm.todos.push(data);
                            });
                        // vm.newObject = createTodo(vm.text, vm.selectedPriority);
                        // vm.todos.push(vm.newObject);
                        vm.text = undefined;
                    }
                    if (vm.todos.length > 0) {
                        var body = angular.element(document.querySelector('body'));
                        body.css('background-image', "none");
                    }
                }

                function createTodo(text, priority) {
                    return {
                        "text": text,
                        "priority": getPriorityNumber(priority),
                        "done": false,
                        "editing": false
                    };
                }

                function getPriorityNumber(priority) {
                    if (priority === "High")
                        return 1;
                    else if (priority === "Medium")
                        return 2;
                    else // "Low"
                        return 3;
                }
            }

            // ORDER BY
            {
                vm.orderByTodo = function() {
                    vm.orderByTodoStartingByA == !vm.orderByTodoStartingByA;

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
            }

            // DELETE
            {
                vm.remove = function remove(index, todoToRemove) {
                    todoFactory
                        .remove(todoToRemove.todoItemId)
                        .then(function(data) {
                            vm.todos.splice(index, 1);
                        });
                }
            }

            // returns the pending todos count
            vm.pendingTodos = function(index) {
                return (vm.todos.filter(function(x) {
                    return x.done == false;
                })).length;
            }
        }
    }
})();
