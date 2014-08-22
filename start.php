<?php

function elgg_angular_init() {
	elgg_register_simplecache_view('js/angular.js');
	elgg_register_simplecache_view('js/jquery.js');
	elgg_register_simplecache_view('js/moment.js');
	elgg_register_simplecache_view('js/ng/modules/ngResource.js');
	elgg_register_simplecache_view('js/ng/modules/ngSanitize.js');
	
	elgg_extend_view('page/elements/foot', 'ng/init');
}


function elgg_api_page_handler($segments, $name) {
	switch ($segments[0]) {
		case 'users': // elgg-api/users/:id
			$user = get_user($segments[1]);
					
			echo json_encode(array(
				'name' => $user->getDisplayName(),
				'guid' => $user->getGuid(),
				'url' => $user->getUrl(),
				'icons' => array(
					'topbar' => $user->getIconURL('topbar'),
					'tiny' => $user->getIconURL('tiny'),
					'small' => $user->getIconURL('small'),
				),
			));
			
			return true;
	
		default:
			return null;
	}
}

elgg_register_event_handler('init', 'system', 'elgg_angular_init');
elgg_register_page_handler('elgg-api', 'elgg_api_page_handler');
