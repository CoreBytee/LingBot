const DiscordJs = require("discord.js")

module.exports = {
    Data: new DiscordJs.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    Execute: async function(Interaction) {
        await Interaction.reply("Pong!");
    }
}