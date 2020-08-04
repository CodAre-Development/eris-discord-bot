const Eris = require('eris');
const fs = require('fs');
const client = new Eris("TOKENİNİZ");
const db = require('quick.db');
client.commands = new Eris.Collection();
client.aliases = new Eris.Collection();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

fs.readdir("./komutlar/", async (err, files) => {

  if(err) console.log(err);
  if (!files) return console.log("Komut bulunamadı.");
  let jsfile = files.filter(f => f.split(".").pop() == "js")
  if(jsfile.length <= 0){
    console.log("Komut bulunamadı.");
    return;
  }

  for (const f of jsfile) {
    let props = require(`./commands/${f}`);
    console.log(`${f} yüklendi`);
    client.commands.set(props.help.name, props);
    for (const aliase of props.help.aliase) {
      client.aliases.set(aliase, props)
    }
  };
  console.log("Tüm komutlar yüklendi.")
  await sleep(400)
  console.log("Giriş yapılıyor...")
});

client.on('ready', () => {
  console.log(`Başarıyla ${client.user.username} olarak giriş yapıldı.`);
});

client.on("messageCreate", (message) => {
  let prefix;
  if (!message.guildID) prefix = "!";
  if (message.guildID) prefix = db.fetch(`prefix_${message.guildID}`) || "!";
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0]
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if (!commandfile) commandfile = client.aliases.get(cmd.slice(prefix.length))
  if(commandfile) commandfile.run(client, message, args);
})

client.on('error', async error => {
  console.error(error.stack)
})

client.on('warn', async warn => {
  console.warn(warn)
})

client.connect();