'use strict';

/* App Module */

angular.module('puls3', ['puls3Service']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/articles', {templateUrl: 'views/articleList.html',   controller: ArticleListCtrl}).
      when('/articles/:id', {templateUrl: 'views/article-detail.html', controller: ArticleDetailCtrl}).
      otherwise({redirectTo: '/articles'});
}]);

