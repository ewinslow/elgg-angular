define(function(require) {
	var angular = require('angular');
	var elgg = require('ng/modules/elgg');

	/**
	 * @ngInject
	 */
	function runLikes(elggMenus) {
		var likesItem = elggMenus.get('entity').items.get('likes');
		
		likesItem.templateUrl = require.toUrl('./menus/entity/likes.html');
	}

	return angular.module('elgg/likes', [
		elgg.name
	])
		.directive('elggLikesButton', require('elgg/likes/directives/elggLikesButton/elggLikesButton'))
		.run(runLikes);
});
