Flappy Bird with bot
==============

The game
--------------

You can set up everything in Init.js. If you wish to turn off the bot and paly by yourself,
just keep pressing the space and reach the highest score you can.

**Setting up the bot**

In order to make the robot work, you need to following settings:

- Make a BotInit.js file in the js directory with the following commands:
  var bot;
  var url = "your url to the directory where the request.php is".

- Place the request.php on your webserver and provide an sql database.
  In order to make the connection, you'll need a config.inc.php file beside the request.php
  in your directory, with the following properties:
  <?php
  $database_host = "url"; //localhost
  $database_user = "user";
  $database_pass = "password";
  $group_dbnames = array("databaseName");
  ?>

- Follow the way of the robot and enjoy the game. :)