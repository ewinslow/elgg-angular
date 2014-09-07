<?php

function elgg_angular_init() {
	elgg_register_simplecache_view('js/angular.js');
	elgg_register_simplecache_view('js/jquery.js');
	elgg_register_simplecache_view('js/moment.js');
	elgg_register_simplecache_view('js/ng/modules/ngResource.js');
	elgg_register_simplecache_view('js/ng/modules/ngSanitize.js');
	
	elgg_extend_view('page/default', 'page/default.3', 3);
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
	
	$apiBase = elgg_normalize_url("/elgg-api");
	
	$entityUrl = "$apiBase/entities/$entity->guid";
	
	$result = array(
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
		'url' => $entityUrl,
		'comments' => array(
			'url' => "$entityUrl/comments",
		),
		'likers' => array(
			'url' => "$entityUrl/likers",
		),
	);
	
	if ($entity->getSubtype() == 'groupforumtopic') {
		$result['replies'] = array(
			'url' => "$apiBase/discussions/$entity->guid/replies",
		);
	} 
	
	return $result;
}


global $resources;
$resources = array(
	'/discussions/(\d+)/replies' => '\Elgg\Api\Discussions\Discussion\RepliesResource',
	'/entities/(\d+)' => '\Elgg\Api\Entities\EntityResource',
	'/entities/(\d+)/comments' => '\Elgg\Api\Entities\Entity\CommentsResource',
	'/entities/(\d+)/discussions' => '\Elgg\Api\Entities\Entity\DiscussionsResource',
	'/me' => '\Elgg\Api\MeResource',
);


// Check that everything is configured correctly...
foreach ($resources as $path => $controller) {
	if (!class_exists($controller)) {
		echo "Could not find controller '$controller' for resource path '$path'";
		exit;
	}
}

function elgg_api_page_handler($segments, $name) {
	global $resources;
	
	$url = "/" . implode($segments, '/');
	$method = strtolower($_SERVER['REQUEST_METHOD']);
	
	
	if ($method != 'get') {
		// TODO(evan): Turn on action_gatekeeper();
	}
	
	foreach ($resources as $route => $controller) {
		$pattern = "#^$route$#";

		$matches = array();
		
		if (preg_match($pattern, $url, $matches)) {
			
			$resource = new $controller($matches);
			

			$input = json_decode(file_get_contents('php://input'));
			
			header("Content-Type: application/json");

			try {
				if (!is_callable(array($resource, $method))) {
					throw new \Elgg\Exception\MethodNotAllowed();
				}

				$result = $resource->$method($input);
				ksort($result);
				echo json_encode($result);
			} catch (\Elgg\Exception\BadRequest $e) {
				echo json_encode(array(
					'status' => '4xx',
				));
			} catch (\Exception $e) {
				echo json_encode(array(
					'status' => '5xx',
				));
			}

			return true;
		}
	}
	
	return null;
}

function elgg_angular_comments($type, $subtype, $returnval, $params) {
	$entity = $params['entity'];
	
	$entityApiUrl = elgg_normalize_url("/elgg-api/entities/$entity->guid");
	return "<elgg-resource src='$entityApiUrl' as='entity'>" .
		"<elgg-comments entity='entity.data'></elgg-comments>" .
		"</elgg-resource>";
}

elgg_register_event_handler('init', 'system', 'elgg_angular_init');
elgg_register_page_handler('elgg-api', 'elgg_api_page_handler');
elgg_register_plugin_hook_handler('comments', 'all', 'elgg_angular_comments');
