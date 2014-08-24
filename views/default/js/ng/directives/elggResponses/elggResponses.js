define(function(require) {
	return function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
            	object: '='
            },
            template: require("text!./elggResponses.html"),
            controller: require('./ElggResponsesCtrl')
        };
    };
});