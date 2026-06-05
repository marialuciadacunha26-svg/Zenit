const {
  Client,
  GatewayIntentBits,
  Collection
} = require('discord.js');

const config = require('./Config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

const comandos = [
  require('./Ban.js'),
  require('./Ping.js'),
  require('./Ticket.js'),
  require('./Ia.js')
];

for (const command of comandos) {
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`${client.user.tag} online!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(
    interaction.commandName
  );

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply({
      content: 'Erro ao executar comando.',
      ephemeral: true
    });
  }
});

client.login(config.token);