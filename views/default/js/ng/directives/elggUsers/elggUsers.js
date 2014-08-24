// <script>
define(function(require) {
	return function() {
        return {
            restrict: 'A',
            replace: true,
			template: require("text!./elggUsers.html"),
            controller: require('./ElggUsersCtrl')
        };
    };
});