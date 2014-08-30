define(function(require) {
	/**
	 * @ngInject
	 */
	return function() {
        return {
            restrict: 'E',
            scope: {
                'entity': '=',
            },
            template: require('text!./elggComments.html'),
        };
    };
});