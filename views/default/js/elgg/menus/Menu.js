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
		materialize: function(params) {
			var items = this.items_.toObject();
			
			return Object.keys(items).map(function(name) {
				return items[name].materialize(name, params);
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
