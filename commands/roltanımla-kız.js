const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`"\`Yönetici\`" olman gerek.`);
   message.delete();
   let rolismi = args.slice(0).join(" ");
   let role = message.guild.roles.find("name", rolismi);
   let kızrolü = db.fetch(`kızrol_${message.guild.id}`)
   
   if (!role) return message.channel.send('Girilen rol bulunamadı.')
   
     if(args[0] === "sıfırla") {
     if(!kızrolü) {
       message.channel.send(`Ayarlanmayan şeyi sıfırlayamazsın.`)
       return
     }
     
     db.delete(`kızrol_${message.guild.id}`)
     message.channel.send(`Rol başarıyla sıfırlandı.`)
     return
   }
 
   db.set(`kızrol_${message.guild.id}`, role.id)

   const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`Kız rolü başarıyla ${role.name} olarak tanımlandı.`)
   message.channel.send(embed);

};
  exports.help = {
    name: 'roltanımla-kız'
  };