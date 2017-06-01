'use strict';

angular.module('users').config(['$stateProvider',
	function ($stateProvider) {
		$stateProvider
		.state('guidance', {
			url: '/guidance',
			templateUrl: 'modules/guidance/client/views/guidance-main.html'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'modules/contact/client/views/contact.html'
		});
	}
]);
