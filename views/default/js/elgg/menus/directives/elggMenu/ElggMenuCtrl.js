define(function() {
	
	/**
	 * @ngInject
	 */
	function ElggMenuCtrl($scope, elggMenus) {
		this.$scope_ = $scope;
		this.elggMenus_ = elggMenus;
	}
	
	ElggMenuCtrl.prototype = {
		getSections: function() {
			return this.elggMenus_.get(this.$scope_.type).sections.values;
		},
	};
	
	return ElggMenuCtrl;
});
