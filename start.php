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

function unix_to_atom($timestamp) {
	$datetime = new DateTime();
	return $datetime->setTimestamp($timestamp)->format(DateTime::ATOM);
}

function elgg_entity_resource(ElggEntity $entity = null, $recursive = true) {
	if (!$entity) {
		return null;
	}
	
	return array(
		'description' => $entity->description,
		'guid' => $entity->guid,
		'container' => $recursive ? elgg_entity_resource($entity->getContainerEntity(), false) : null,
		'owner' => $recursive ? elgg_entity_resource($entity->getOwnerEntity(), false) : null,
		'icons' => array(
			'topbar' => $entity->getIconURL('topbar'),
			'tiny' => $entity->getIconURL('tiny'),
			'small' => $entity->getIconURL('small'),
			'default' => $entity->getIconURL(),
			'medium' => $entity->getIconUrl('medium'),
			'large' => $entity->getIconUrl('large'),
		),
		'name' => $entity->getDisplayName(),
		'time_created' => unix_to_atom($entity->time_created),
		'time_updated' => unix_to_atom($entity->time_updated),
		'url' => elgg_normalize_url("/elgg-api/entities/$entity->guid"),
		'comments' => array(
			'url' => "$url/comments",
		),
		'likers' => array(
			'url' => "$url/likers",
		),
	);
}



function elgg_api_page_handler($segments, $name) {
	$resources = array(
		'/entities/(\d+)' => '\Elgg\Api\EntityResource',
		'/entities/(\d+)/comments' => '\Elgg\Api\Entities\CommentsResource',
		'/users/me' => '\Elgg\Api\Users\MeResource',
	);
	
	$url = "/" . implode($segments, '/');
	$method = strtolower($_SERVER['REQUEST_METHOD']);
	
	if ($method != 'get') {
		action_gatekeeper();
	}
	
	foreach ($resources as $route => $callbacks) {
		$pattern = "#^$route$#";

		$matches = array();
		
		if (preg_match($pattern, $url, $matches)) {
			
			$resource = new $callbacks($matches);
			
			if (!is_callable(array($resource, $method))) {
				return null;
			}

			$result = $resource->$method();

			if (is_array($result)) {
				header("Content-Type: application/json");
				echo json_encode($result);
			} else {
				header("Content-Type: text/html");
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
