define(function() {
	var Ctrl = require('./ElggToggleButtonCtrl');
	var template = require('text!./elggToggleButton.html');

	/**
	 * @ngInject
	 */
	return function() {
		return {
	        controller: Ctrl,
	        controllerAs: 'ctrl',
	        restrict: 'E',
	        template: template,
	    };
	};
});