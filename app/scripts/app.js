'use strict';

/**
 * @ngdoc overview
 * @name appWidnwillApp
 * @description
 * # appWidnwillApp
 *
 * Main module of the application.
 */
angular
    .module('appWidnwillApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ( $routeProvider, $locationProvider ) {
        // set default hashPrefix
        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl',
                controllerAs: 'contact',
            })
            .otherwise({
                redirectTo: '/'
            });
    });
