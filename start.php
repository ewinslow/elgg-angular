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

function elgg_entity_resource(ElggEntity $entity = null) {
	if (!$entity) {
		return null;
	}
	
	return array(
		'description' => $entity->description,
		'guid' => $entity->guid,
		'owner' => elgg_entity_resource($entity->getOwnerEntity()),
		'icons' => array(
			'topbar' => $entity->getIconURL('topbar'),
			'tiny' => $entity->getIconURL('tiny'),
			'small' => $entity->getIconURL('small'),
			'default' => $entity->getIconURL(),
			'medium' => $entity->getIconUrl('medium'),
			'large' => $entity->getIconUrl('large'),
		),
		'name' => $entity->getDisplayName(),
		'url' => $entity->getUrl(),
	);
}



function elgg_api_page_handler($segments, $name) {
	$resources = array(
		'/users/me' => function($matches) {
			return elgg_entity_resource(elgg_get_logged_in_user_entity());
		},
		'/entities/(\d+)' => function($matches) {
			$entity = get_entity($matches[1]);
			
			return elgg_entity_resource($entity);
		},
		'/entities/(\d+)/comments' => function($matches) {
			$options = array(
				'type' => 'object',
				'subtype' => 'comment',
				'container_guid' => $matches[1],
				'reverse_order_by' => true,
				'full_view' => true,
				'limit' => get_input('limit', 50),
			);
			
			$options['count'] = true;
			$count = elgg_get_entities($options);
			
			$comments = array();
			
			if ($count) {
				$options['count'] = false;
				$comments = elgg_get_entities($options);
			}
			
			$result = array(
				'items' => array(),
				'count' => $count,
			);
			
			foreach ($comments as $comment) {
				$result['items'][] = elgg_entity_resource($comment);
			}
			
			return $result;
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
				header("Content-Type: application/json");
				echo json_encode($result);
			} else {
				echo $result;
			}
			
			return true;
		}
	}
	
	return null;
}

function elgg_angular_comments($type, $subtype, $returnval, $params) {
	$entity = $params['entity'];
	
	return "<elgg-comments entity='$entity->guid'></elgg-comments>";
}

elgg_register_event_handler('init', 'system', 'elgg_angular_init');
elgg_register_page_handler('elgg-api', 'elgg_api_page_handler');
elgg_register_plugin_hook_handler('comments', 'all', 'elgg_angular_comments');