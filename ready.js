module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`🤖 Zenith online: ${client.user.tag}`);
  }
};