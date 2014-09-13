define(function(require) {
	/**
	 * @ngInject
	 */
	return function() {
        return {
            restrict: 'E',
            controller: require('./ElggLikesButtonCtrl'),
            controllerAs: 'ctrl',
            scope: {
                'entity': '=',
            },
            replace: true,
            template: require('text!./elggLikesButton.html'),
        };
    };
});