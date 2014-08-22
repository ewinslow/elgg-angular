<?php
/**
 * Elgg user display
 *
 * @uses $vars['entity'] ElggUser entity
 * @uses $vars['size']   Size of the icon
 */

$entity = $vars['entity'];
$size = elgg_extract('size', $vars, 'tiny');

$icon = elgg_view_entity_icon($entity, $size, $vars);

$title = '<a href="{{$resource.json.url}}">{{$resource.json.displayName}}</a>';

$metadata = elgg_view_menu('entity', array(
	'entity' => $entity,
	'sort_by' => 'priority',
	'class' => 'elgg-menu-hz',
));

if (elgg_in_context('owner_block') || elgg_in_context('widgets')) {
	$metadata = '';
}

if (elgg_get_context() == 'gallery') {
	echo $icon;
} else {
	if ($entity->isBanned()) {
		$banned = elgg_echo('banned');
		$params = array(
			'entity' => $entity,
			'title' => $title,
			'metadata' => $metadata,
		);
	} else {
		$params = array(
			'entity' => $entity,
			'title' => $title,
			'metadata' => $metadata,
			'subtitle' => $entity->briefdescription,
			'content' => elgg_view('user/status', array('entity' => $entity)),
		);
	}

	$list_body = elgg_view('user/elements/summary', $params);

	echo "<elgg-resource src='/elgg-api/users/{$entity->getGuid()}'>";
	echo elgg_view_image_block($icon, $list_body, $vars);
	echo "</elgg-resource>";
}
