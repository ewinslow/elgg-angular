define(function(require) {
	var Ctrl = require('./ElggToggleButtonCtrl');
	
	describe('ElggToggleButtonCtrl', function() {
		it('Can tell you whether it is currently pressed', function() {
			var props = {'pressed': true};
			var ctrl = new Ctrl(null, props);
			
			expect(ctrl.isPressed()).toBe(true);
			
			props['pressed'] = false;
			
			expect(ctrl.isPressed()).toBe(false);
		});
		
		it('Performs the configured action when clicked', function() {
			var props = {
				"pressed": false,
				"href": "/base",
				"press": {
					"method": "put",
					"data": {"press": true},
				},
				"unpress": {
					"method": "delete",
				},
			};
			
			var $http = jasmine.createSpy('$http');
			
			var ctrl = new Ctrl($http, props);
			
			ctrl.click();
			
			expect($http).toHaveBeenCalledWith({method: 'put', url: '/base', data: {'press': true}});
			
			ctrl.click();
			
			expect($http).toHaveBeenCalledWith({method: 'delete', url: '/base'});
		});
		
		it('eagerly (synchronously) updates the isPressed state when clicked', function() {
			var props = {'pressed': true};
			var $http = jasmine.createSpy('$http');
			var ctrl = new Ctrl($http, props);
			
			expect(ctrl.isPressed()).toBe(true);
			
			ctrl.click();
			
			expect(ctrl.isPressed()).toBe(false);

			ctrl.click();
			
			expect(ctrl.isPressed()).toBe(true);
		});
	});
});
