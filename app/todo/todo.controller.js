(function() {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['todoFactory'];

    /* @ngInject */
    function TodoController(todoFactory) {
        var vm = this;

        // variables
        vm.orderByTodoStartingByA = false;
        vm.orderByPriorityStartingByA = false;
        vm.todos = [];
        vm.priorities = [
            'High',
            'Medium',
            'Low'
        ];

        vm.selectedPriority = vm.priorities[0];

        // when user clicks submit button, add a new todo
        vm.click = function click() {
            if (vm.text != undefined) {
                vm.newObject = createTodo(vm.text, vm.selectedPriority);
                vm.todos.push(vm.newObject);
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
                "priority": priority,
                "done": false,
                "editing": false
            };
        }

        // order todo list by todo name
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
})();
