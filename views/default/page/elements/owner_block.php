<?php
/**
 * Elgg owner block
 * Displays page ownership information
 *
 * @package Elgg
 * @subpackage Core
 *
 */

elgg_push_context('owner_block');

// groups and other users get owner block
$owner = elgg_get_page_owner_entity();
if ($owner instanceof ElggGroup || $owner instanceof ElggUser) {

	$header =<<<ENTITY
<!-- TODO(ewinslow): Set up caching for elgg-resource
     so we can save on requests during a refresh -->
<elgg-resource src="/elgg-api/users/{$entity->getGuid()}">
	<a class="elgg-image-block"
	   href="{{\$resource.json.url}}">
		<div class="elgg-image">
			<!-- TODO(evan): Make this a directive that can tell
			     what the width/height are supposed to be. -->
			<img src="{{\$resource.json.icons.small}}">
		</div>
		<div class="elgg-body">
			{{\$resource.json.name}}
		</div>
	</a>
</elgg-resource>
ENTITY;

	$body = elgg_view_menu('owner_block', array('entity' => $owner));

	$body .= elgg_view('page/elements/owner_block/extend', $vars);

	echo elgg_view('page/components/module', array(
		'header' => $header,
		'body' => $body,
		'class' => 'elgg-owner-block',
	));
}

elgg_pop_context();