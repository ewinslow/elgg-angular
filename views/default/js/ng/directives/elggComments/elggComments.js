// <script>
define(function(require) {
    var template = require('text!./elggComments.html');
    
	/**
	 * @ngInject
	 */
	return function() {
        return {
            restrict: 'E',
            scope: {
                'entity': '@',
            },
            template: template,
        };
    };
});