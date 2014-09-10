define(function(require) {
	/**
	 * @ngInject
	 */
	return function($httpProvider) {
		$httpProvider.interceptors.push(function(elgg) {
			return {
				'request': function(config) {
					elgg.security.addToken(config.data);
					
					return config;
				},
			};
		});
	};
});
