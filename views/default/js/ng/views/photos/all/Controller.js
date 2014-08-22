// <script>
define(function() {
	function Controller($scope, albums) {
		$scope.albums = albums;		
	};

	Controller.$resolve = {
		albums: function(elggDatabase) {
			return elggDatabase.getAlbums();
		}
	};

	return Controller;
});
