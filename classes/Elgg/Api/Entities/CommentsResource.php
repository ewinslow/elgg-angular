<?php

namespace Elgg\Api\Entities;

class CommentsResource {
	public function __construct($matches) {
		$this->container_guid = $matches[1];
	}
	
	public function get() {
		$options = array(
			'type' => 'object',
			'subtype' => 'comment',
			'container_guid' => $this->container_guid,
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
	}
	
	public function post() {
		$data = json_decode(file_get_contents('php://input'));
		
		$comment = new ElggComment();
		$comment->container_guid = $this->container_guid;
		$comment->description = $data->description;
		$comment->save();
		
		return elgg_entity_resource($comment);
	}
}