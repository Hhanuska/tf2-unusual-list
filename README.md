# tf2-unusual-list
 
Get a list of all existing unusuals from Team Fortress 2.
Not including unusual weapons, warpaints and multi-quality unusuals.

The list contains item objects, see example for properties:

```
{
    "fullName": "Burning Flames Team Captain",
    "name": "Team Captain",
    "defindex": 378,
    "quality": 5,
    "effect": 13,
    "class": "Multi",
    "exist": 18,
    "slot": "misc",
    "price": 7600
}
```

Creating the complete list takes a long time, because there is a limit on the amount of requests we can make, therefore a pre-made list is included.

## getEverything(delay, list)

Async function to create the list of unusuals based on https://backpack.tf/unusuals.

delay - Specify the time between each request (in ms) to avoid getting IP banned. Default 10000 ms.

list - Optional. An array of item names, if omitted, get all items that can be Unusuals and use that as the list

## getUnusuals()

Async function to create a list of item names that can be unusuals based on https://backpack.tf/unusuals.

## getEffects(item)

Async function to create a list of all possible effects for an item.

item - Name of the item

Returns a list of objects:

```
{
    "fullName": "Burning Flames Team Captain",
    "name": "Team Captain",
    "defindex": 378,
    "quality": 5,
    "effect": 13,
    "class": "Multi",
    "exist": 18,
    "slot": "misc",
    "price": 7600
}
```
