(function() {
    'use strict';

    angular
        .module('app')
        .factory('todoFactory', todoFactory);

    todoFactory.$inject = ['$http'];

    /* @ngInject */
    function todoFactory($http) {
        var service = {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            remove: remove
        };

        return service;

        function getAll(){
          return $http
            .get('http://localhost:2132/api/TodoItems')
            .then(function(response){
              return response.data;
            });
        }

        function getById(id) {
          return $http
            .get('http://localhost:2132/api/TodoItems/' + id)
            .then(function(response){
              return response.data;
            });
        }

        function update(id, todoItem) {
          return $http
            .put('http://localhost:2132/api/TodoItems' + id, todoItem);
        }

        function create(todoItem) {
          return $http
            .post('http://localhost:2132/api/TodoItems', todoItem)
            .then(function(response){
              return response.data;
            });
        }

        function remove(id) {
          return $http
            .delete('http://localhost:2132/api/TodoItems' + id)
            .then(function(response) {
              return response.data;
            });
        }
    }
})();
