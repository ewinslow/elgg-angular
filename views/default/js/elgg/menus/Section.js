define(function(require) {
	function Section(menu) {
		this.menu_ = menu;
	}
	
	Section.prototype = {
		getItems: function(params) {
			return this.menu_.getItems(params).filter(function(item) {
				return item.section == this;
			}.bind(this));
		}
	};
	
	return Section;
});
