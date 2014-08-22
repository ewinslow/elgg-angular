// <script>

define(function() {
	return function($scope, $routeParams, elgg, $location) {
		$scope.blog = {
			guid: 0,
			container: {
				guid: $routeParams.guid
			},
			access_id: 0,
			status: 'draft',
			comments_on: 'On',
		};
	};
});
