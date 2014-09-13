define(function(require) {
	
	function Item(menu) {
		this.menu_ = menu;

		this.href = '';
		this.label = '';
		this.section = 'default';
	}
	
	function materialize(value, params) {
		if (typeof value != 'function') {
			return value;
		}
		
		return value(params);
	}

	Item.prototype = {
		materialize: function(name, params) {
			return {
				action: this.action,
				href: materialize(this.href, params),
				icon: materialize(this.icon, params),
				label: materialize(this.label, params),
				templateUrl: materialize(this.templateUrl, params) || require.toUrl('./menus/default.html'),
				name: name,
			};
		},
		
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
