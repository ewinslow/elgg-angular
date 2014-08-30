define(function(require) {
	var angular = require('angular');
	var elgg = require('ng/modules/elgg');

	/**
	 * @ngInject
	 */
	function run(elggMenus) {
		var likesItem = elggMenus.get('entity').items.get('likes');
		
		likesItem.label = "You like this";
		likesItem.href = "https://google.com";
	}

	return angular.module('elgg/likes', [
		elgg.name
	]).run(run);
});
