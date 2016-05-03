[logo]: https://udacity.com/favicon.ico "Udacity"
![udacity][logo] Project 4: Classic Arcade Game Clone
====================================
***

This game is an game where the player has to make it past enemies to the other side of the map.

## Installation
* Download the zipped folder
* Extracts its contents to your computer
* Open ```index.html``` to run the project.

## Usage

The goal is to get the player across the map to the water. Each successful crossing will increase the player's score. If you get hit by a bug along the way, you will decrease your score and be reset to the starting position.

To move the player, press one of the keys listed below for its direction.

* Directions
   - **Up :** ```W``` or ```▲```
   - **Left :** ```A``` or ```◀```
   - **Down :** ```S``` or ```▼```
   - **Right :** ```D``` or ```▶```

## Changes
* Apr 6, 2016
   - ```Enemy``` and ```Player``` are now subclasses of the ```Character``` class.
   - ```displayScore``` is now a function of the ```Player``` class
   - The initial starting y coordinate of the player is stored in the ```yStart``` variable to reduce the amount of code for the ```reset``` function of the ```Player``` class.
* Apr 7, 2016
   - ```Enemy``` and ```Player``` now correctly inherit the ```render``` function from the ```Character``` class.
   - ```displayScore``` is now called from ```engine.js```
   - The ```handleInput``` function now uses a switch statement to change the player coordinates.
   - Changed the row and column limits into variables for ease of reading and changing the code.
   - ```chosenChar``` and the ```sprites``` array are now part of the ```Character``` class.
