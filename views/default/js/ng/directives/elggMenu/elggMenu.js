define(function(require) {
	/**
	 * @ngInject
	 */
	return function() {
        return {
            restrict: 'E',
            scope: {
                'type': '@',
                'entity': '@',
            },
            template: require('text!./elggMenu.html'),
        };
    };
});