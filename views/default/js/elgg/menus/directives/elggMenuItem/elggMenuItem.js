define(function(require) {
	/**
	 * @ngInject
	 */
	return function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				'item': '=',
				'params': '=',
			},
			templateUrl: require.toUrl('./elggMenuItem.html'),
		};
	};
});