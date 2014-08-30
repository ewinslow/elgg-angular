define(function(require) {
	function Section(menu) {
		this.menu_ = menu;
	}
	
	Section.prototype = {
		get items() {
			return this.menu_.items.values.filter(function(item) {
				return item.section == this;
			}.bind(this));
		}
	};
	
	return Section;
});
