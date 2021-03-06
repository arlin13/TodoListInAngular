(function() {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController)
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

    TodoController.$inject = ['todoFactory'];

    /* @ngInject */
    function TodoController(todoFactory) {
        var vm = this;

        // VARIABLES
        {
            vm.orderByTodoStartingByA = false;
            vm.orderByPriorityStartingByA = false;
            vm.todos = [];
            vm.priorities = {
                'High': 1,
                'Medium': 2,
                'Low': 3
            };
            vm.defaultPriority = "Select a Priority";
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
                vm.addTodo = function addTodo() {
                    if (vm.text != undefined && vm.selectedPriority != vm.defaultPriority) {
                        console.log(vm.text);
                        console.log(vm.selectedPriority);
                        var newTodo = createTodo(vm.text, vm.selectedPriority);
                        todoFactory
                            .create(newTodo)
                            .then(function(data) {
                                vm.todos.push(data);
                            });
                        vm.text = undefined;
                    }
                    hideBackgroundImage();
                }

                function createTodo(text, priority) {
                    // "priority": getPriorityNumber(priority),
                    return {
                        "text": text,
                        "priority": priority,
                        "done": false,
                        "editingText": false
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

                vm.getPriorityText = function getPriorityText(priority) {
                    switch (priority) {
                        case 1:
                            return "High";
                        case 2:
                            return "Medium";
                        case 3:
                            return "Low";
                        default:
                            return "";
                    }
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

            // UPDATE
            {
                vm.updateIsDone = function updateIsDone(todoToUpdate) {
                    todoFactory
                        .update(todoToUpdate.todoItemId, todoToUpdate);
                }
                vm.updateText = function updateText(todoToUpdate) {
                    todoToUpdate.editingText = false;
                    todoFactory
                        .update(todoToUpdate.todoItemId, todoToUpdate);
                }
                vm.updatePriority = function updatePriority(todoToUpdate) {
                    todoToUpdate.editingPriority = false;
                    todoFactory
                        .update(todoToUpdate.todoItemId, todoToUpdate);
                }
            }

            // ORDER BY
            {
                vm.orderByTodo = function() {
                    vm.orderByTodoStartingByA = !vm.orderByTodoStartingByA;

                    vm.todos.sort(function(a, b) {
                        var todoA = a.text.toUpperCase();
                        var todoB = b.text.toUpperCase();

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

            // returns the pending todos count
            vm.pendingTodos = function() {
                return (vm.todos.filter(function(x) {
                    return x.isDone == false;
                })).length;
            }

            // CSS functions
            function hideBackgroundImage() {
                if (vm.todos.length > 0) {
                    var body = angular.element(document.querySelector('body'));
                    body.css('background-image', "none");
                }
            }

            vm.mouseOver = function mouseOver(event) {
                var imgId = "editImg-" + event.srcElement.id;
                var editImg = angular.element(document.getElementById(imgId).removeAttribute("hidden"));
            }

            vm.mouseLeave = function mouseLeave(event) {
                var imgId = "editImg-" + event.srcElement.id;
                var editImg = angular.element(document.getElementById(imgId).setAttribute("hidden", true));
            }
        }
    }
})();
