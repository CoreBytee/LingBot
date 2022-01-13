local Discordia = require("discordia")
local Slash = require("discordia-slash")
local Client = Discordia.Client():useSlashCommands()
require("discordia-components")
require("discordia-interactions")

local Config = require("./Config.lua")

Client:on("slashCommandsReady", function ()
    local Guild = Client:getGuild(Config.Guild)
    local Channel = Guild:getChannel(Config.Channel)

    local GameCommand = Slash.new("game", "Start a Game", function (Interaction, Parameters)
            
    end)
    Client:slashCommand(
        GameCommand:finish()
    )
end)

Client:run("Bot " .. Config.Token)