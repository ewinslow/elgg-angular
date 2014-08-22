define(function(require) {
	return function($scope, plugin) {
		$scope.plugin = plugin;
		
		$scope.activate = function() {
			this.plugin.active = true;
		};
		
		$scope.deactivate = function() {
			this.plugin.active = false;
		};
	};
});