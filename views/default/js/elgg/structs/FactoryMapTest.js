define(function(require) {
	var FactoryMap = require('./FactoryMap');

	describe("FactoryMap", function() {
		it("by default returns the value returned by factory when get() is called", function() {
			function factory() { return true; }
			
			var map = new FactoryMap(factory);
			expect(map.get('foo')).toBe(true);
		});
		
		it("returns the same instance on subsequent calls to get() with the same key", function() {
			function factory() { return new Object(); }
			
			var map = new FactoryMap(factory);
			var obj1 = map.get('foo');
			var obj2 = map.get('foo');
			
			expect(obj1).toBe(obj2);
		});
		
		it("returns new instances on subsequent calls to get() with different keys", function() {
			function factory() { return new Object(); }
			
			var map = new FactoryMap(factory);
			
			var obj1 = map.get('foo');
			var obj2 = map.get('bar');
			
			expect(obj1).not.toBe(obj2);
		});
		
		it("can override particular values with set()", function() {
			function factory() { return 'bar'; }
			var map = new FactoryMap(factory);
			
			expect(map.get('foo')).toBe('bar');
			
			map.set('foo', 'baz');
			
			expect(map.get('foo')).toBe('baz');
		});

		it("reverts to the default value if set to `null` or `undefined`", function() {
			function factory() { return true; }
			var map = new FactoryMap(factory);
			
			expect(map.get('foo')).toBe(true);
			
			// Setting to null reverts to default
			map.set('foo', null);

			expect(map.get('foo')).toBe(true);

			// Setting to undefined reverts to default
			map.set('foo', undefined);

			expect(map.get('foo')).toBe(true);
		});
		
		it("can store `false` as a value", function() {
			function factory() { return true; }
			var map = new FactoryMap(factory);

			expect(map.get('foo')).toBe(true);

			map.set('foo', false);

			expect(map.get('foo')).toBe(false);
		});
	});
});
