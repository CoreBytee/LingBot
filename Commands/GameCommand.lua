local GameCommand = Slash.new("game", "Start a Game", function (Interaction, Parameters, Command)
    print("run")
    if Interaction.channel.id ~= Config.Channel then
        Interaction:reply("You are not in the <#" .. Config.Channel .. "> channel.", true)
    end
    Interaction:reply("Game running " .. #Game.Word .. " characters.\n" .. Game.Blank)
end)

Guild:slashCommand(
    GameCommand:finish()
)