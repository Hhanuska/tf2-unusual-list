# tf2-unusual-list
 
Get a list of all existing unusuals from Team Fortress 2.

Creating the complete list takes a long time, because there is a limit on the amount of requests we can make, therefore a pre-made list is included.

## getEverything(delay, useSave)

Async function to create the list of unusuals based on https://backpack.tf/unusuals. Saves the list in ```./files/allUnusuals.json```.

delay - Specify the time between each request (in ms) to avoid getting IP banned. Default 10000 ms.

useSave - Set to true if you already have a list of possible unusual item names. This list gets saved the first time you run this function. Useful if you want to use your own list of item names, instead of all items.

## getList()

Function to read the saved list.
