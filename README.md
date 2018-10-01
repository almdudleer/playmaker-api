Playmaker api
----
Quickstart
----
* `npm install` in project root directory 
* Create .env file with required config values in KEY=VALUE format `cp .env_example .env`
  * `STEAM_API_KEY` You need this in order to access the Steam Web API, which is used to fetch basic match data, player profile data, and cosmetic item data. You can use your main account to obtain the API key; You can request an API key here: https://steamcommunity.com/dev/apikey
  * `DB_CONNECTION_STRING` uri to your MongoDB 
  `(mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]])`
  * `PM_PORT` Running port
* `npm start` run the server 
  
