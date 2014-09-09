<?php
	$entity = $params['entity'];
	
	$entityApiUrl = elgg_normalize_url("/elgg-api/entities/$entity->guid");
?>

<h3>Comments</h3>
<elgg-resource src="<?= $entityApiUrl; ?>" as="entity">
	<elgg-comments entity='entity.content'>
		<div class="elgg-ajax-loader" aria-label="Loading..."></div>
	</elgg-comments>
</elgg-resource>
