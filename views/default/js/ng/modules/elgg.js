define(function(require) {
	var angular = require('angular');
	var elgg = require('elgg');
	var ngSanitize = require('./ngSanitize');
	var ngResource = require('./ngResource');
	var moment = require('./moment');
	
	/**
	 * @ngInject
	 */
	function fallBackToFullPageRefresh($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider.otherwise({
			redirectTo: function() { 
				var targetHref = window.location.href;
				window.history.back();
				setTimeout(function() {
					window.location.href = targetHref;
				}, 0);
				
			}
		});
	}
	
	return angular.module('elgg', [
		ngSanitize.name,
		ngResource.name,
		moment.name,
	])
		.config(fallBackToFullPageRefresh)
		.directive('elggFocusModel', require('../directives/elggFocusModel/factory'))
		.directive('elggResponses', require('../directives/elggResponses/factory'))
		.directive('elggRiver', require('../directives/elggRiver/factory'))
		.directive('elggRiverComment', require('../directives/elggRiverComment/factory'))
		.directive('elggRiverItem', require('../directives/elggRiverItem/factory'))
		.directive('elggUsers', require('../directives/elggUsers/factory'))
		.directive('whenScrolled', require('../directives/whenScrolled/factory'))
		.value('elgg', elgg)
		.value('elggSession', elgg.session)
		.value('elggUser', elgg.session.user)
});
