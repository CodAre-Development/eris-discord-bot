const Eris = require("eris");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

  const prefix = args.join(' ')
  if (!prefix) return message.channel.createMessage(`Bir prefix belirtmelisin.`)
  if (prefix.includes(' ')) return message.channel.createMessage(`Bir prefix boşluk içeremez.`)
  if (prefix.length > 5) return message.channel.createMessage(`Bir prefix 5 karakterden uzun olamaz.`)

  db.set(`prefix_${message.guildID}`, prefix)
  message.channel.createMessage(`Başarıyla prefix **${prefix}** olarak ayarlandı!`)
}

module.exports.help = {
  name: "prefix",
  aliase: ["setprefix"],
  description: "Botun bu sunucuda kullanacağı öneki seçmeye yarar.",
  usage: "prefix [yeni önek]",
  category: 'staff'
}