// <script>
define(function(require) {
    var template = require('text!./elggMenu.html');
    
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
            template: template,
        };
    };
});