// <script>
define(function() {
	function Controller($scope, river, elggLoggedInUser) {
		$scope.river = river;
		$scope.user = elggLoggedInUser;
		
		$scope.loadNextItems = function() {
			this.river.loadNextItems().always(function() {
				$scope.$digest();
			});
		};
	}

	Controller.$resolve = {
		river: function(elggDatabase) {
			return elggDatabase.getActivity();
		},
	};

	return Controller;
});
