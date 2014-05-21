'use strict';

angular.module('attachmentsApp')
  .controller('MainCtrl', function ($scope, cornercouch) {
    $scope.server = cornercouch();
    $scope.db = $scope.server.getDB('lrs');
    $scope.docs = $scope.db.query('app', 'statements', {include_docs: true});
    console.log($scope.db);
    
  });
