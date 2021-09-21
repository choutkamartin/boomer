import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./utils/dbConnect";
import Word from "./models/Word";

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

dbConnect();

client.on("ready", () => {
  console.log("Bot je ready.");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    message.delete();
    return;
  }
  if (/[íáýé]$/.test(message.content)) {
    message.delete();
    message.author.send("Zkus prosím slovo, které nekončí na í, á, ý nebo é.");
    return;
  }
  Word.findOne({ name: message.content }, async (err: any, word: any) => {
    if (word != null) {
      if (word.said === true) {
        message.delete();
        message.author.send("Slovo už bylo použito.");
        return;
      }
      const messages = await message.channel.messages.fetch({ limit: 2 });
      const lastMessage = messages.last();
      const firstLetter = message.content.charAt(0);
      const lastLetter = lastMessage!.content.slice(-1);
      if (firstLetter === lastLetter) {
        word.said = true;
        word.save();
        return;
      } else {
        message.delete();
        message.author.send(
          "První písmeno tvého slova se neshoduje s posledním písmenem posledního slova."
        );
        return;
      }
    } else {
      message.delete();
      message.author.send("Slovo neexistuje.");
      return;
    }
  });
});

client.login(process.env.DISCORD_TOKEN);
