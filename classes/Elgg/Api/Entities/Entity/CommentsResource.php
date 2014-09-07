<?php
namespace Elgg\Api\Entities\Entity;

use Elgg\Storage\Entities;

/**
 * @UrlTemplate(/entities/{container_guid}/comments)
 */
class CommentsResource {
	public function __construct($matches) {
		$this->container_guid = $matches[1];
		
		$this->entities = new Entities();
	}
	
	public function get($input) {
		$comments = $this->entities->find(array(
			'type' => 'object',
			'subtype' => 'comment',
			'container_guid' => $this->container_guid,
			'reverse_order_by' => true,
			'full_view' => true,
			'limit' => $input->limit,
		));
		
		return array(
			'count' => $comments->count(),
			'items' => $comments->map(function($comment) {
				return elgg_entity_resource($comment);
			}),
		);
	}
	
	public function post($input) {
		$container = $this->entities->get($this->container_guid);
		
		$comment = $this->entities->create(array(
			'type' => 'object',
			'subtype' => 'comment',
			'container_guid' => $container->guid,
			'description' => $input->description,
			'access_id' => $container->access_id,
		));

		return elgg_entity_resource($comment);
	}
}