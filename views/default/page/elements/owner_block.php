<?php
/**
 * Elgg owner block
 * Displays page ownership information
 *
 * @package Elgg
 * @subpackage Core
 *
 */

// groups and other users get owner block
$owner = elgg_get_page_owner_entity();
if (!($owner instanceof ElggGroup || $owner instanceof ElggUser)) {
	return true;
}

$owner_guid = $owner->getGUID();

elgg_push_context('owner_block');
$extension = elgg_view('page/elements/owner_block/extend', $vars);
elgg_pop_context();

?>

<div class="elgg-module elgg-owner-block">
	<div class="elgg-head">
		<!-- TODO(ewinslow): Set up caching for elgg-resource
		     so we can save on requests during a refresh -->
		<elgg-resource src="/elgg-api/entities/<?= $owner_guid ?>" as="owner">
			<a class="elgg-image-block"
			   ng-href="{{owner.data.url}}">
				<div class="elgg-image">
					<!-- TODO(evan): Make this a directive that can tell
					     what the width/height are supposed to be. -->
					<img ng-src="{{owner.data.icons.small}}">
				</div>
				<div class="elgg-body" ng-bind="owner.data.name">
					Owner
				</div>
			</a>
		</elgg-resource>
	</div>
	<div class="elgg-body">
		<elgg-resource src="/elgg-api/entities/<?= $owner_guid ?>/menus/owner_block?context=owner_block"
			          as="menu" ng-bind-html="menu.data">
		</elgg-resource>
		<?= $extension ?>
	</div>
</div>