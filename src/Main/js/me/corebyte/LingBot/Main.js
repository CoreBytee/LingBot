const FS = require("fs-extra")
const DiscordJs = require("discord.js")

globalThis.LingBot = {
    Words: Import("me.corebyte.LingBot.Words"),
    Config: FS.readJSONSync("config.json"),
    Client: new DiscordJs.Client(
        {
            intents: [3276799],
        }
    ),
    Commands: {
        Ping: Import("me.corebyte.LingBot.Commands.PingCommand")
    }
}

LingBot.Client.login(LingBot.Config.Token);