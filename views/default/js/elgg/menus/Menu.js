define(function(require) {
	var FactoryMap = require('elgg/structs/FactoryMap');
	var Item = require('./Item');
	var Section = require('./Section');
	
	function Menu() {
		this.items_ = new FactoryMap(function() {
			return new Item();
		});
		this.sections_ = new FactoryMap(function() {
			return new Section(this);
		}.bind(this));
	}
	
	Menu.prototype = {
		get items() {
			return this.items_;
		},
		
		get sections() {
			return this.sections_;
		},
	};
	
	return Menu;
});
