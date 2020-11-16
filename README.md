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

## getEverything(delay, useSave)

Async function to create the list of unusuals based on https://backpack.tf/unusuals. Saves the list in ```./files/allUnusuals.json```.

delay - Specify the time between each request (in ms) to avoid getting IP banned. Default 10000 ms.

useSave - Set to true if you already have a list of possible unusual item names. This list gets saved the first time you run this function. Useful if you want to use your own list of item names, instead of all items.

## getUnusuals(useSave)

Async function to create a list of item names that can be unusuals based on https://backpack.tf/unusuals. Saves the list it ```./files/possibleUnusuals.json```.

useSave - Set to true to read the saved file, instead of creating a new one.

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

## getList()

Function to read the saved list.
