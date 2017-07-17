'use strict';

/**
 * @ngdoc function
 * @name appWidnwillApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appWidnwillApp
 */
angular.module('appWidnwillApp')
	.controller('MainCtrl', function ( $scope, $http ) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.perPage = 3;
		$scope.loadMoreLink = true;
		
		/*
		 * hideLoadMore
		 * hiding load more link / button
		 */
		$scope.hideLoadMore = function( totalPages, currentPage ){
			if( totalPages == currentPage ){
				$scope.loadMoreLink = true;
			}else{
				$scope.loadMoreLink = false;
			}
			console.log( $scope.loadMoreLink );
		};


		/*
		 * initProduct
		 * load product when first init page
		 */
		$scope.initProduct = function(){
			$scope.currentPage = 1;
			$http.get( 'http://localhost/_learn/api-widnwill/wp-json/wp/v2/product/?per_page=' + $scope.perPage )
				.then( function( response ){
					$scope.totalPages = response.headers('X-WP-TotalPages'); // get total pages
					$scope.productFirst = [];
					$scope.productsLeft = [];
					$scope.productsRight = [];
					$scope.posts = response.data;
					console.log( response.data );

					// split response array of product for display in grid (left & right)
					for( var i = 0; i < response.data.length; i++ ){
						if( 0 === i ){
							$scope.productFirst.push(response.data[i]);
						}else{
							if( 0 === (i % 2)){
								$scope.productsRight.push( response.data[i] );
							}else{
								$scope.productsLeft.push( response.data[i] );
							}
						}
					}
					$scope.hideLoadMore( $scope.totalPages, $scope.currentPage );
				});
			
		};

		$scope.initProduct();
		
		
		/*
		 * loadMoreProduct
		 * load more products when load more click
		 */ 
		$scope.loadMoreProduct = function(){
			$scope.currentPage += 1;
			$http.get('http://localhost/_learn/api-widnwill/wp-json/wp/v2/product/?per_page=' + $scope.perPage + '&page=' + $scope.currentPage )
				.then( function( response ){
					for( var i = 0; i < response.data.length; i++ ){
						var iPlus = i+1;
						if( 0 === (iPlus % 2) ){
							$scope.productsRight.push( response.data[i] );
						}else{
							$scope.productsLeft.push( response.data[i] );
						}
					}
					$scope.hideLoadMore( $scope.totalPages, $scope.currentPage );
				});
			
		};


	});