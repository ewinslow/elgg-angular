define(function(require) {
	/**
	 * @ngInject
	 */
	return function() {
		return {
			controller: require('./ElggMenuCtrl'),
			controllerAs: 'ctrl',
			restrict: 'E',
			require: 'elggMenu',
			scope: {
				'type': '@',
				'params': '=',
			},
			link: function($scope, $element, $attrs, ctrl) {
				ctrl.$link($scope);
			},
			templateUrl: require.toUrl('./elggMenu.html'),
		};
	};
});