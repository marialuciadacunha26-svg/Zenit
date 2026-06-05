const {
  SlashCommandBuilder,
  ChannelType,
  PermissionsBitField
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Criar ticket'),

  async execute(interaction) {

    const canal =
      await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: ChannelType.GuildText,

        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [
              PermissionsBitField.Flags.ViewChannel
            ]
          },
          {
            id: interaction.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel
            ]
          }
        ]
      });

    interaction.reply({
      content: `🎫 Ticket criado: ${canal}`,
      ephemeral: true
    });
  }
};