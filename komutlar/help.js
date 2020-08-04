const Eris = require("eris");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

  function colorToSigned24Bit(s) {
    return (parseInt(s.substr(1), 16) << 8) / 256;
}

  let prefix = db.fetch(`prefix_${message.guildID}`) || "!"
  let helpcommands = client.commands.filter(prop => prop.help.category == "help" && prop.help.name != "help")
  if (helpcommands.length == 0) return message.channel.createMessage(`Hiçbir komut yok.`)
  let helpcommandsmap = helpcommands.map(p => '<:rightarrow:709539888411836526> **' + prefix + p.help.name + '** ' + p.help.descriptionen + `\n`).join('')
    message.channel.createMessage({embed: {title: '__**Komutlar**__', description: helpcommandsmap, color: colorToSigned24Bit("#2F3136"), footer: {text: client.user.username, icon_url: client.user.avatarURL || client.user.defaultAvatarURL}}})
}

module.exports.help = {
  name: "yardım",
  aliase: ["yardim"],
  description: "Komutları gösterir.",
  usage: "yardım",
  category: 'help'
}