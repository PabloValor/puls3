'use strict';

/* Controllers */

function ArticleListCtrl($scope, $location, Article, socket) {
	$scope.articleList = Article.query();

	$scope.navigate = function(id){
		$location.path('/articles/' + id);
	};

	$scope.downVote = function(article){
		event.stopPropagation();
		article.votes --; 
		Article.update(article);
	};

	$scope.upVote = function(article){
		event.stopPropagation();
		article.votes ++; 
		Article.update(article);
	};

	socket.on("articles::create", function(data){
		$scope.articleList.push(data);
	});

	socket.on("articles::update", function(data){
		var articleData = $scope.articleList;
		for(var i in articleData)
	  	{
	  		var post = articleData[i];
	  		if (data.id === post.id) {
	  			articleData[i].votes = data.votes;
	  		};
	  	}
	});
}

function ArticleDetailCtrl($scope, $routeParams, Article, socket) {
	var id = $routeParams.id;
  	Article.query(function(data){
	  	for(var i in data)
	  	{
	  		var post = data[i];
	  		if (id === post.id) {
	  			$scope.post = post;
	  		};
	  	}
	  });

  	$scope.downVote = function(article){
		event.stopPropagation();
		article.votes --; 
		Article.update(article);
	};

	$scope.upVote = function(article){
		event.stopPropagation();
		article.votes ++; 
		Article.update(article);
	};

	socket.on("articles::update", function(data){
		if($scope.post.id === data.id){
			$scope.post.votes = data.votes;
		}
	});
}

function ArticleNew($scope, $location, Article){
	$scope.article = {};
	$scope.save = function(){
		Article.save($scope.article, function(data){			
			$location.path('/articles/' +  data.id);
			$scope.article = {};
		});
	};
}