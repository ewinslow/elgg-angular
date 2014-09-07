define(function(require) {
	var FactoryMap = require('elgg/structs/FactoryMap');
	var Item = require('./Item');
	var Section = require('./Section');
	
	function Menu() {
		this.items_ = new FactoryMap(function() {
			return new Item(this);
		}.bind(this));
		this.sections_ = new FactoryMap(function() {
			return new Section(this);
		}.bind(this));
	}
	
	Menu.prototype = {
		/**
		 * Materialize this menu's items with the given list of params.
		 * 
		 * @param {Object} params
		 * 
		 * @return Array.<Object>
		 */
		getItems: function(params) {
			var materialize = Item.materialize;
			
			return this.items_.map(function(item, name) {
				return {
					action: item.action,
					href: materialize(item.href, params),
					icon: materialize(item.icon, params),
					label: materialize(item.label, params),
					name: name,
				};
			});
		},
		
		get items() {
			return this.items_;
		},
		
		get sections() {
			return this.sections_;
		},
	};
	
	return Menu;
});
