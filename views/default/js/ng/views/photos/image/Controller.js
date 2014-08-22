// <script>

define(function() {
	function Controller($scope, image) {
		$scope.image = image;
	}

	Controller.$resolve = {
		image: function(elggDatabase, $route) {
			return elggDatabase.getObject('/image-json', {
				guid: $route.current.params.guid
			});
		}
	};

	return Controller;
});
