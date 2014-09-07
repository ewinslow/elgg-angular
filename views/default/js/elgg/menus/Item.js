define(function() {
	
	function Item(menu) {
		this.menu_ = menu;

		this.href = '';
		this.label = '';
		this.section = 'default';
	}

	Item.prototype = {
		get section() {
			return this.section_;
		},
		
		set section(value) {
			if (typeof value == 'string') {
				value = this.menu_.sections.get(value);
			}
			
			this.section_ = value;
		},
	};
	
	return Item;
});
