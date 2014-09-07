define(function() {
	/**
	 * @ngInject
	 */
	function ElggMenuCtrl(elggMenus) {
		this.menus_ = elggMenus;
	}
	
	ElggMenuCtrl.prototype = {
		getSections: function(type) {
			return this.menus_.get(type).sections.toObject();
		},
		
		materialize: function(value, params) {
			return typeof value == 'function' ? value(params) : value;
		},
	};
	
	return ElggMenuCtrl;
});
