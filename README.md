thing for my girlfriend's discord server

# Build
```npm install```

# Usage

create a config.json in the app directory as such

```json
{
	"token": "token-goes-here",
	"clientId": "appid-goes-here",
	"guildId": "guild-id-for-registering-commands",
	"homeId": "home-id-go-here",
	"roleId": "role-id-go-here"
}
```

must run `node dbInit.js` to initialize databases
deploy commands with `node deploy-commands.js`

You will also want to replace the emoji IDs 
(at the top of inc/gemconversion.js)