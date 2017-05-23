'use strict';

/**
 * @ngdoc function
 * @name appWidnwillApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appWidnwillApp
 */
angular.module('appWidnwillApp')
	.controller('MainCtrl', function ( $scope, $http, $routeParams, $controller ) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		this.contentRender = '';
		$http.get( 'http://localhost/_learn/api-widnwill/wp-json/wp/v2/product')
			.then( function( response ){
				$scope.productFirst = [];
				$scope.productsLeft = [];
				$scope.productRight = [];
				$scope.posts = response.data;

				for( var i = 0; i < response.data.length; i++ ){
					if( i == 0 ){
						$scope.productFirst.push(response.data[i]);
					}else{
						if( i % 2 == 0 ){
							$scope.productRight.push( response.data[i] );
						}else{
							$scope.productsLeft.push( response.data[i] );
						}
					}
				}
			});
	});
