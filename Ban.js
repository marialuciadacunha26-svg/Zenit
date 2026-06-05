const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banir usuário')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('Usuário')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers
    ),

  async execute(interaction) {
    const user =
      interaction.options.getUser('usuario');

    const member =
      interaction.guild.members.cache.get(user.id);

    await member.ban();

    interaction.reply(
      `🔨 ${user.tag} foi banido.`
    );
  }
};