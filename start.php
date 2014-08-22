<?php

function elgg_angular_init() {
	elgg_register_simplecache_view('js/angular.js');
	elgg_register_simplecache_view('js/jquery.js');
	elgg_register_simplecache_view('js/moment.js');
	elgg_register_simplecache_view('js/ng/modules/ngResource.js');
	elgg_register_simplecache_view('js/ng/modules/ngSanitize.js');
	
	elgg_extend_view('page/elements/foot', 'ng/init');
}


function elgg_menu_resource($menu, array $vars = array()) {
	$context = get_input('context', '', false);
	
	if (!empty($context)) {
		elgg_push_context($context);
	}
	
	$vars['sort_by'] = get_input('sort', $vars['sort_by'], false);
	
	return elgg_view_menu($menu, $vars);
}



function elgg_api_page_handler($segments, $name) {
	$resources = array(
		'/entities/(\d+)' => function($matches) {
			$user = get_user($matches[1]);
			
			return array(
				'name' => $user->getDisplayName(),
				'guid' => $user->getGuid(),
				'url' => $user->getUrl(),
				'icons' => array(
					'topbar' => $user->getIconURL('topbar'),
					'tiny' => $user->getIconURL('tiny'),
					'small' => $user->getIconURL('small'),
				),
			);
		},
		'/entities/(\d+)/menus/([a-z_-]+)' => function($matches) {
			return elgg_menu_resource($matches[2], array(
				'entity' => get_entity($matches[1]),
			));
		},
		'/menus/([a-z_-]+)' => function($matches) {
			return elgg_menu_resource($matches[1]);
		},
	);
	
	$url = "/" . implode($segments, '/');
	
	foreach ($resources as $route => $callback) {
		$pattern = "#^$route$#";

		$matches = array();
		
		if (preg_match($pattern, $url, $matches)) {
			$result = $callback($matches);
			
			if (is_array($result)) {
				echo json_encode($result);
			} else {
				echo $result;
			}
			
			return true;
		}
	}
	
	return null;
}

elgg_register_event_handler('init', 'system', 'elgg_angular_init');
elgg_register_page_handler('elgg-api', 'elgg_api_page_handler');
