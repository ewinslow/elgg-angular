// <script>
define(function(require) {
	var $ = require('jquery');
	
	return function() {
        return {
            restrict: 'A',
            replace: true,
            template: require("text!./elggRiverItem.html"),
            controller: require('./ElggRiverItemCtrl'),
            scope: {
	        'activity': '='
	    },
        };
    };
});
