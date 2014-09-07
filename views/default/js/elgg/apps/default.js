define(function(require) {
	var angular = require('angular');
	
	// TODO build this list dynamically with PHP for per-app customization
	return angular.bootstrap(document, [
		require('elgg/discussions/ng').name,
		require('elgg/http/ng').name,
		require('elgg/likes/ng').name,
		require('elgg/menus/ng').name,
		require('ng/modules/elgg').name,
		require('ng/modules/moment').name,
	]);
})