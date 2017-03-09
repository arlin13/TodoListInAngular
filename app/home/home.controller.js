angular
  .module('app')
  .controller('HomeController', HomeController);

function HomeController(){
  var vm = this;

  vm.todos = [];

  vm.click = function click(){
    vm.todos.push(vm.newTodo);
    vm.newTodo = ' ';
  }
}
