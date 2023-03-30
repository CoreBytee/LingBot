const DiscordJs = require('discord.js');

module.exports = {
    Data: new DiscordJs.SlashCommandBuilder()
        .setName('reveal')
        .setDescription('Reveal the current word'),
    Execute: async function (Interaction) {
        if (Interaction.user.id !== Interaction.guild.ownerId) {
            Interaction.reply({content: 'https://tenor.com/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713', ephemeral: true});
            return;
        }
        Interaction.reply({content: 'The current word is: ' + LingBot.WordsManager.CurrentWord, ephemeral: true});
    }
}