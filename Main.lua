_G.Discordia = require("discordia")
_G.Slash = require("discordia-slash")
_G.Client = Discordia.Client():useSlashCommands()
require("discordia-components")
require("discordia-interactions")
Slash.constructor()

_G.Config = require("./Config.lua")
_G.Game = {}

_G.Blocks = {
    Blue = ":blue_square:",
    Brown = ":brown_square:",
    Green = ":green_square:",
    Orange = ":orange_square:",
    Purple = ":purple_square:",
    Red = ":red_square:",
    White = ":white_large_square:",
    Yellow = ":yellow_square:",
}

function StartGame()
    Game.Word = string.lower(Config.Words[math.random(1, #Config.Words)])
    Game.Playing = true

    local Blank = ""
    for I = 1, #Game.Word do
        Blank = Blank .. Blocks.Yellow
    end
    Game.Blank = Blank
    Channel:send("New game started.\n" .. #Game.Word .. " characters.\n" .. Blank)
end

Client:on("slashCommandsReady", function ()
    _G.Guild = Client:getGuild(Config.Guild)
    _G.Channel = Guild:getChannel(Config.Channel)

    require("./Commands/GameCommand.lua")
    require("./Commands/RevealCommand.lua")
    require("./Commands/HelpCommand.lua")


    StartGame()
end)

function Part(String, Index)
    return string.sub(String, Index, Index)
end

Client:on("messageCreate", function (Message)
    if Message.channel.id ~= Config.Channel then print("wrong channel") return end
    if Message.author.bot == true then return end
    if string.find(Message.content, " ") then print("has space") return end
    if Game.Playing == false then return end

    local ReturnedBlocks = ""
    local Content = string.lower(Message.content)
    local Correct = 0

    for I = 1, #Content do
        
        if Part(Game.Word, I) == "" then
            ReturnedBlocks = ReturnedBlocks .. Blocks.Purple
        elseif Part(Game.Word, I) == Part(Content, I) then
            ReturnedBlocks = ReturnedBlocks .. Blocks.Green
            Correct = Correct + 1
        elseif string.find(Game.Word, Part(Content, I)) then
            ReturnedBlocks = ReturnedBlocks .. Blocks.Orange
            Correct = Correct + 1
        else
            ReturnedBlocks = ReturnedBlocks .. Blocks.Red
        end
    end

    print(Correct)
    local Addon
    local Done = false

    if #Content > #Game.Word then
        Addon = "Thats a bit too long"
    elseif #Content < #Game.Word then
        Addon = "Thats a bit too short"
    elseif Correct == #Game.Word then
        Addon = "You win!\nThe word was `" .. string.upper(Game.Word) .. "`\n:tada:"
        Done = true
    elseif Correct == 0 then
        Addon = "Thats not fully correct"
    else
        Addon = "Thats not quite right! (" .. Correct .. "/" .. #Game.Word .. ")"
    end

    Message:reply(
        {
            content = Addon .. "\n" .. ReturnedBlocks,
            reference = {
                message = Message.id,
                mention = true,
            }
        }
        
    )

    if Done == true then
        Message:reply("New game starting soon!")
        Game.Playing = false
        require("timer").sleep(6000)
        StartGame()
    end
end)

Client:run("Bot " .. Config.Token)