define(function(require) {
	/**
	 * @ngInject
	 */
	return function() {
		return {
			controller: require('./ElggMenuCtrl'),
			controllerAs: 'ctrl',
			restrict: 'E',
			scope: {
				'name': '@',
				'resource': '@',
			},
			templateUrl: require.toUrl('./elggMenu.html'),
		};
	};
});