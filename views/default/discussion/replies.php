<?php


$url = elgg_normalize_url("/elgg-api/entities/{$vars['topic']->guid}");

?>

<elgg-resource src="<?= $url ?>" as="topic">
	<h3><?= elgg_echo('group:replies'); ?></h3>
	<elgg-discussion-replies topic="topic.content">
		<div class="elgg-ajax-loader" aria-label="Loading..."></div>
	</elgg-discussion-replies>
</elgg-resource>