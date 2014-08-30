define(function(require) {
	var LazyMap = require('./LazyMap');

	describe("LazyMap", function() {
		it("by default returns the value returned by factory when get() is called", function() {
			function factory() { return true; }
			
			var map = new LazyMap(factory);
			expect(map.get('foo')).toBe(true);
		});
		
		it("returns the same instance on subsequent calls to get() with the same key", function() {
			function factory() { return new Object(); }
			
			var map = new LazyMap(factory);
			var obj1 = map.get('foo');
			var obj2 = map.get('foo');
			
			expect(obj1).toEqual(obj2);
		});
		
		it("returns new instances on subsequent calls to get() with different keys", function() {
			function factory() { return new Object(); }
			
			var map = new LazyMap(factory);
			
			var obj1 = map.get('foo');
			var obj2 = map.get('bar');
			
			expect(obj1).not.toEqual(obj2);
		});
		
		it("can override particular values with set()", function() {
			function factory() { return true; }
			
			var map = new LazyMap(factory);
			expect(map.get('foo')).toBe(true);
			
			map.set('foo', false);
			
			expect(map.get('foo')).toBe(false);
		});
	});
});
