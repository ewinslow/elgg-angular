define(function(require) {
	var angular = require('angular');
	var elggHttp = require('elgg/http/ng');

	return angular.module('elgg/discussions', [
		elggHttp.name,
	])
		.directive('elggDiscussionReplies', require('./directives/elggDiscussionReplies/elggDiscussionReplies'))
});
