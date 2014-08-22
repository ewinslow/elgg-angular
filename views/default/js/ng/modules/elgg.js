define(function(require) {
	var angular = require('angular');
	var elgg = require('elgg');
	var ngSanitize = require('./ngSanitize');
	var ngResource = require('./ngResource');
	var moment = require('./moment');
	
	return angular.module('elgg', [
		ngSanitize.name,
		ngResource.name,
		moment.name,
	])
		.directive('elggComments', require('../directives/elggComments/factory'))
		.directive('elggFocusModel', require('../directives/elggFocusModel/factory'))
		.directive('elggMenu', require('../directives/elggMenu/factory'))
		.directive('elggResource', require('../directives/elggResource/factory'))
		.directive('elggResponses', require('../directives/elggResponses/factory'))
		.directive('elggRiver', require('../directives/elggRiver/factory'))
		.directive('elggRiverComment', require('../directives/elggRiverComment/factory'))
		.directive('elggRiverItem', require('../directives/elggRiverItem/factory'))
		.directive('elggUsers', require('../directives/elggUsers/factory'))
		.directive('whenScrolled', require('../directives/whenScrolled/factory'))
		.service('elggResourceFactory', require('elgg/http/ResourceFactory'))
		.value('elgg', elgg)
		.value('elggSession', elgg.session)
		.value('elggUser', elgg.session.user)
});
