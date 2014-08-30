define(function(require) {
	var angular = require('angular');

	return angular.module('elgg/http', [])
		.directive('elggResource', require('./directives/elggResource/elggResource'))
		.service('elggResourceFactory', require('./ResourceFactory'))
});
