const {
  SlashCommandBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ia')
    .setDescription('IA falsa')
    .addStringOption(option =>
      option
        .setName('pergunta')
        .setDescription('Pergunta')
        .setRequired(true)
    ),

  async execute(interaction) {
    const pergunta =
      interaction.options.getString('pergunta');

    const respostas = [
      "Interessante...",
      "Talvez sim.",
      "Não tenho certeza.",
      "Isso parece possível.",
      "Vou analisar isso."
    ];

    const resposta =
      respostas[
        Math.floor(
          Math.random() * respostas.length
        )
      ];

    interaction.reply(
      `🤖 **Pergunta:** ${pergunta}\n\n${resposta}`
    );
  }
};