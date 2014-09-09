Elgg comes with a menu system that renders all the HTML on the server.
One request to server per menu on a page is a wee painful, and not very dynamic.

Instead, we need to render the menus on the client side,
which basically requires this re-implementation of the menus system.

### Service: `elggMenus` (See `elgg/structs/FactoryMap` API Reference)
This is simply an instance of `FactoryMap`
that returns an `elgg/menus/Menu` from the getter.

#### `get(menuName)`
Get (or create) a menu definition.

```js
/** @ngInject */
require('ng/modules/elgg').run(function(elggMenus) {
  var entityMenu = elggMenus.get('entity');

  // Configure the menu...
});
```

### `elgg/menus/Menu` API Reference
Menus are collections of links and/or buttons typically rendered together on a page.

TODO:
 - [ ] Insert picture of a menu with the sections and items clearly labeled

#### `items`
The read-only `items` property allows you to control the list of items included in this menu. Items is a map so you can use the standard get/set/remove methods to manage what items are part of this menu. 

Get an item. This will create a new one if it doesn't exist yet.
```js
var item = menu.items.get('delete');
```

Set an item to a particular instance:
```js
menu.items.set('delete', item);
```

Remove an item:
```js
menu.items.remove('delete');
menu.items.remove(item);
```

Combine `remove` and `set` to move an item from one menu to another:
```js
var otherMenuItem = otherMenu.items.remove('delete');
menu.items.set('delete', otherMenuItem);
```

#### `sections`
Each renders its items into "sections". See the `elgg/menus/MenuSection` docs for more details.

This is a read-only map just like the `items` map discussed above.

Getting a section will create a new one if it doesn't exist yet:
```js
var section = menu.sections.get('default');
```

Setting a section puts all of them items in that section into the menu and loses all the other menu items that were a part of the old section by the same name.
```js
menus.sections.set('default', section);
```

Removing a section also removes all the items currently associated with that section:
```js
var section = menu.sections.remove('default');
```


### `elgg/menus/MenuSection` API Reference
Each menu is divided into "sections". Each section has a label and can be ordered relative to the other sections.


### `elgg/menus/MenuItem` API reference

#### `action`
Defines the default on-click/tap behavior of the menu item:

```js
/** @ngInject */
item.action = function() {
  alert('You triggered the action');
};
```

Setting this will reset the `href` setting to `null`.

#### `controller`
If you need custom logic to complement your template, you can provide a controller:
```js
item.controller = require('elgg/menus/entity/likes/Ctrl');
```

#### `href`
If you set the `href`, clicking the menu item will navigate to the specified page.
```js
item.href = 'https://elgg.example.org/foo/bar';
item.href = '/foo/bar'
/** @ngInject */
item.href = function() {
  return '/foo/bar';
};
```

Setting this will set the `action` setting to `null`.

#### `icon`
Set this to a string id of the icon to show for this item.

```js
item.icon = 'trash';
```

#### `label`
The label is just the text that is shown for the menu item.

There is actually no api for setting the label. Instead, override the language string:
```php
return array(
  'menus:entity:items:delete:label' => 'Delete',
);
```

#### `parent`
This option allows setting up a hierarchy out of the menu items.

```js
item.parent = 'more';
item.parent = menu.items.get('more');
```

#### `priority`
This determines the order in which the menu items are rendered. Items with lower absolute value numbers are listed first.

```js
item.priority = 500; // default
item2.priority = 2;
```

#### `section`
The section param allows you to set how the menu item should be grouped:
```js
item.section = 'default'; // This is the default behavior
item.section = menu.sections.get('default'); // equivalent
```

#### `template`
The template option allows you to completely take over the rendering of the menu item. You can use this to insert a custom directive.

```js
item.template = '<elgg-likes-button entity="{{entity.content.guid}}"></elgg-likes-button>';
item.template = require('text!elgg/menus/entity/likes/template.html');
```


