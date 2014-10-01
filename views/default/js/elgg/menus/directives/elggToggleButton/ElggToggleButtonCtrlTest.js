define(function(require) {
	var Ctrl = require('./ElggToggleButtonCtrl');
	var $http;
	
	beforeEach(function() {
		$http = {
			put: jasmine.createSpy(),
			delete: jasmine.createSpy(),
		};
	});

	describe('ElggToggleButtonCtrl', function() {
		it('Can tell you whether it is currently pressed', function() {
			var props = {'is_pressed': true};
			var ctrl = new Ctrl(null, props);
			
			expect(ctrl.isPressed()).toBe(true);
			
			props['is_pressed'] = false;
			
			expect(ctrl.isPressed()).toBe(false);
		});
		
		it('Performs the configured action when clicked', function() {
			var props = {
				"is_pressed": false,
				"href": "/base",
				"press": {
					"method": "put",
					"params": {"press": true},
				},
				"unpress": {
					"method": "delete",
				},
			};
			
			var ctrl = new Ctrl($http, props);
			
			ctrl.click();
			
			expect($http.put).toHaveBeenCalledWith(props.href, props.press.params);
			
			ctrl.click();
			
			expect($http.delete).toHaveBeenCalledWith(props.href, jasmine.any());
		});
		
		it('eagerly (synchronously) updates the isPressed state when clicked', function() {
			var props = {'is_pressed': true};
			var ctrl = new Ctrl($http, props);
			
			expect(ctrl.isPressed()).toBe(true);
			
			ctrl.click();
			
			expect(ctrl.isPressed()).toBe(false);

			ctrl.click();
			
			expect(ctrl.isPressed()).toBe(true);
		});
	});
});
