/**
 * LazyMap always returns a value when get() is called.
 * 
 * The default value is whatever is returned by the factory function.
 */
define(function(require) {
	function LazyMap(factory) {
		this.factory_ = factory;
		this.items_ = {};
	}
	
	LazyMap.prototype = {
		get: function(key) {
			if (!this.items_[key]) {
				this.set(key, this.factory_());
			}
			
			return this.items_[key];
		},
		
		set: function(key, value) {
			this.items_[key] = value;
		},
	};
	
	
	return LazyMap;
});
