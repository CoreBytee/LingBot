const DiscordJs = require("discord.js")

module.exports = async function() {
    TypeWriter.Logger.Information("Deploying commands...")
    LingBot.REST.put(
        DiscordJs.Routes.applicationGuildCommands(LingBot.Client.user.id, LingBot.Config.ServerId),
        { body: LingBot.Commands.map(Command => Command.Data.toJSON()) }
    )
    TypeWriter.Logger.Information("Deployed commands.")

    LingBot.Client.on(
        "interactionCreate",
        async function(Interaction) {
            if (!Interaction.isCommand()) return
            const Command = LingBot.Commands.filter(Command => Command.Data.name === Interaction.commandName)[0]
            if (!Command) return
            await Command.Execute(Interaction)
        }
    )
}