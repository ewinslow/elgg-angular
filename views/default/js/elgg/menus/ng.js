define(function(require) {
	var angular = require('angular');
	var elggHttp = require('elgg/http/ng');
	var FactoryMap = require('elgg/structs/FactoryMap');
	var Menu = require('./Menu');

	return angular.module('elgg/menus', [
		elggHttp.name
	])
		.directive('elggMenu', require('./directives/elggMenu/elggMenu'))
		.directive('elggMenuItem', require('./directives/elggMenuItem/elggMenuItem'))
		.value('elggMenus', new FactoryMap(function() {
			return new Menu();
		}));
});
