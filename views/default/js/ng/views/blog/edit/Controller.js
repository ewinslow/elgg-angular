// <script>

define(function() {
	function Controller($scope, blog) {
                $scope.blog = blog;
        };

	Controller.$resolve = {
		blog: function($route, elggDatabase) {
			return elggDatabase.getEntity($route.current.params.guid);
		},
	};

	return Controller;
});
