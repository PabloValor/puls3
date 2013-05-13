'use strict';

/* Services */

angular.module('puls3Service', ['ngResource'])
    .factory('Article', function($resource){
  		return $resource('/articles/', {}, {
    		query: {method:'GET', isArray:true}
    		,update : {method : 'PUT'}
  		});
	})
	.factory('socket', function ($rootScope) {
	  var socket = io.connect();
	  return {
	    on: function (eventName, callback) {
	      socket.on(eventName, function () {  
	        var args = arguments;
	        $rootScope.$apply(function () {
	          callback.apply(socket, args);
	        });
	      });
	    },
	    emit: function (eventName, data, callback) {
	      socket.emit(eventName, data, function () {
	        var args = arguments;
	        $rootScope.$apply(function () {
	          if (callback) {
	            callback.apply(socket, args);
	          }
	        });
	      })
	    }
	  };
	})
	;


