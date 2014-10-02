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
			if (this.items_[key] == null) {
				this.set(key, this.factory_());
			}
			
			return this.items_[key];
		},
		
		set: function(key, value) {
			this.items_[key] = value;
		},
		
		toObject: function(callback) {
			var obj = {};
			var items = this.items_;
			
			Object.keys(items).forEach(function(key) {
				obj[key] = items[key];
			});
			
			return obj;
		},
	};
	
	
	return FactoryMap;
});
