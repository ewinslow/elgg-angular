/**
 * FactoryMap always returns a value when get() is called.
 * 
 * If nothing has already be set() for that key,
 * the value returned is whatever is returned when the factory function is called.
 */
define(function(require) {
	function FactoryMap(factory) {
		this.factory_ = factory;
		this.items_ = {};
	}
	
	FactoryMap.prototype = {
		get: function(key) {
			if (!this.items_[key]) {
				this.set(key, this.factory_());
			}
			
			return this.items_[key];
		},
		
		set: function(key, value) {
			this.items_[key] = value;
		},
		
		get values() {
			var items = this.items_;
			
			return Object.keys(items).map(function(key) {
				return items[key];
			});
		},
	};
	
	
	return FactoryMap;
});
