define(function(require) {
	return function() {
        return {
            restrict: 'A',
            replace: true,
			template: require("text!./elggRiver.html"),
            controller: require('./ElggRiverCtrl'),
        };
    };
});