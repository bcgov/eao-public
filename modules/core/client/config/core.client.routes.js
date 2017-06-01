'use strict';

angular.module('core').config (
	['$locationProvider', '$stateProvider', '$urlRouterProvider', '_',
	function ($locationProvider, $stateProvider, $urlRouterProvider, _) {

	$locationProvider.html5Mode(true);

	// Redirect to 404 when route not found
	$urlRouterProvider.otherwise(function ($injector, $location) {
		$injector.get('$state').transitionTo('not-found', null, {
			location: false
		});
	});

	$stateProvider

	.state('not-found', {
		url: '/not-found',
		templateUrl: 'modules/core/client/views/404.client.view.html',
		data: {
			ignoreState: true
		}
	})

	.state('bad-request', {
		url: '/bad-request',
		templateUrl: 'modules/core/client/views/400.client.view.html',
		data: {
			ignoreState: true
		}
	})

	.state('forbidden', {
		url: '/forbidden',
		templateUrl: 'modules/core/client/views/403.client.view.html',
		data: {
			ignoreState: true
		}
	})

	// Compliance Oversight
	.state('compliance-oversight', {
		url: '/compliance-oversight',
		templateUrl: 'modules/compliance-oversight/client/views/compliance-oversight.html',
		data: {}
	})

	// Legislation
	.state('legislation', {
		url: '/legislation',
		templateUrl: 'modules/legislation/client/views/legislation.html',
		data: {}
	})

	// Legislation
	.state('process-and-procedures', {
		url: '/process-and-procedures',
		templateUrl: 'modules/process-and-procedures/client/views/process-and-procedures.html',
		data: {}
	})

	.state('smerr', {
		url: '/smerr',
		reloadOnSearch: false,
		templateUrl: 'modules/core/client/views/smerr.view.html',
		controller: function($scope, $location, _) {
			$scope.userType = ($location.search().t || 'unknown').toLowerCase();
			// combine this with reloadOnSearch = false to strip off the query string now that we have the value we need.
			$location.url($location.path());
		}
	})
	;

}]);











