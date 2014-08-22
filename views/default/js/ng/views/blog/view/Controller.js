// <script>

define(function() {
	function Controller($scope, blog, elgg) {
		$scope.blog = blog;
		
		$scope.deleteEntity = function(guid) {
			elgg.action('blog/delete', {guid:guid}).then(function() {
				window.history.back();
			});
		};
	};

	Controller.$resolve = {
		blog: function(elggDatabase, $route) {
			return elggDatabase.getEntity($route.current.params.guid);
		}
	};

	return Controller;
});
