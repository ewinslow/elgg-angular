// <script>
define(function() {
	function Controller($scope, albums, elggSession, elgg) {
		$scope.albums = albums;		
		$scope.user = elggSession.user;
		$scope.owner = elgg.page_owner;
	};

	Controller.$resolve = {
		albums: function(elggDatabase, $route) {
			return elggDatabase.getAlbums({
				alias: $route.current.params.alias
			});
		}
	};

	return Controller;
});
