<?php
namespace Elgg\Storage;

class Activities {
	public function create(array $properties) {
		return elgg_create_river_item($properties);
	}
}