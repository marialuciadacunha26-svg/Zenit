const {
  ChannelType,
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const config = require("../../config.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const guild = interaction.guild;
    const user = interaction.user;

    // 🎫 CRIAR TICKET
    if (interaction.customId === "create_ticket") {
      const existing = guild.channels.cache.find(
        c => c.name === `ticket-${user.id}`
      );

      if (existing) {
        return interaction.reply({
          content: "❌ Você já tem um ticket aberto!",
          ephemeral: true
        });
      }

      const channel = await guild.channels.create({
        name: `ticket-${user.id}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory
            ]
          }
        ]
      });

      const embed = new EmbedBuilder()
        .setTitle("🎫 Zenith Ticket")
        .setDescription("Explique seu problema e aguarde suporte.")
        .setColor("Green");

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("close_ticket")
          .setLabel("Fechar")
          .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
          .setCustomId("claim_ticket")
          .setLabel("Assumir")
          .setStyle(ButtonStyle.Primary)
      );

      channel.send({
        content: `<@${user.id}>`,
        embeds: [embed],
        components: [row]
      });

      return interaction.reply({
        content: `✅ Ticket criado: ${channel}`,
        ephemeral: true
      });
    }

    // ❌ FECHAR TICKET + LOG
    if (interaction.customId === "close_ticket") {
      const channel = interaction.channel;

      const logChannel = guild.channels.cache.get(config.logChannel);

      if (logChannel) {
        const embed = new EmbedBuilder()
          .setTitle("📁 Ticket Fechado")
          .setDescription(`Ticket: ${channel.name}`)
          .addFields(
            { name: "Fechado por", value: `${interaction.user.tag}` }
          )
          .setColor("Red")
          .setTimestamp();

        logChannel.send({ embeds: [embed] });
      }

      await interaction.reply("⛔ Fechando ticket...");
      setTimeout(() => channel.delete(), 3000);
    }

    // 👮 CLAIM
    if (interaction.customId === "claim_ticket") {
      interaction.channel.setTopic(
        `Assumido por ${interaction.user.tag}`
      );

      interaction.reply({
        content: `👮 Ticket assumido por ${interaction.user}`,
        ephemeral: false
      });
    }
  }
};