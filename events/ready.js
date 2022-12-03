const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);

const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

module.exports = async (client) => {

  const rest = new REST({ version: "10" }).setToken("");
  try {
    
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }

    console.log(`AKTİF: ${client.user.tag}`);
    client.user.setActivity("Marvel | #SOHBET")
};









// ArviS#0011
