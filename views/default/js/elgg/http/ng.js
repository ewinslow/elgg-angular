define(function(require) {
	var angular = require('angular');
	var elgg = require('ng/modules/elgg');

	return angular.module('elgg/http', [
		elgg.name
	])
		.config(require('./config'))
		.directive('elggResource', require('./directives/elggResource/elggResource'))
		.service('elggResourceFactory', require('./ResourceFactory'))
});
