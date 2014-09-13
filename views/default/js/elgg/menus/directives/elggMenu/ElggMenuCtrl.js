define(function() {
	/**
	 * @ngInject
	 */
	function ElggMenuCtrl(elggMenus) {
		this.menus_ = elggMenus;
		
		this.items_ = [];
	}
	
	ElggMenuCtrl.prototype = {
		getItems: function() {
			return this.items_;
		},
		
		/** @ngInject */
		init: function(type, params) {
			this.items_ = this.menus_.get(type).materialize(params);
		},
		
		$link: function($scope) {
			this.init($scope.type, $scope.params);
		},
	};
	
	return ElggMenuCtrl;
});
