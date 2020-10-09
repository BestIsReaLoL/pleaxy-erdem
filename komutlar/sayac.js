const Discord = require('discord.js')
const fs = require('fs')
const ayarlar = require('../ayarlar/sayac.json')
 
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setAuthor(message.guild.name, message.guild.iconURL).setDescription(":no_entry_sign: **Bu komutu kullanabilmek için gerekli olan yetkiye sahip değilsin!**"));
        if(!args[0]) {
                const embed = new Discord.RichEmbed()
						.setAuthor(message.guild.name, message.guild.iconURL)
                        .setDescription(`Lütfen bir sayı yazın!`)
                        .setColor("RANDOM")
                        .setTimestamp()
						.setFooter("Silent", client.user.avatarURL)
                message.channel.send({embed})
                return
        }
 
        let profil = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
 
        if(args[0] === "sıfırla") {
                if(!profil[message.guild.id]) {
                        const embed = new Discord.RichEmbed()
								.setAuthor(message.guild.name, message.guild.iconURL)
                                .setDescription(`Ayarlanmayan şeyi sıfırlayamazsın!`)
                                .setColor("RANDOM")
                                .setTimestamp()
								.setFooter("Silent", client.user.avatarURL)
                        message.channel.send({embed})
                        return
                }
                delete profil[message.guild.id].sayi
                delete profil[message.guild.id]
                fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
                        console.log(err)
                })
                const embed = new Discord.RichEmbed()
						.setAuthor(message.guild.name, message.guild.iconURL)
                        .setDescription(`Sayaç başarıyla sıfırlandı!`)
                        .setColor("RANDOM")
                        .setTimestamp()
						.setFooter("Pleaxy", client.user.avatarURL)
                message.channel.send({embed})
                return
        }
 
        if(isNaN(args[0])) {
                const embed = new Discord.RichEmbed()
						.setAuthor(message.guild.name, message.guild.iconURL)
                        .setDescription(`Lütfen bir sayı yazın!`)
                        .setColor("RANDOM")
                        .setTimestamp()
						.setFooter("pleaxy", client.user.avatarURL)
                message.channel.send({embed})
                return
        }
 
        if(args[0] <= message.guild.members.size) {
                const embed = new Discord.RichEmbed()
						.setAuthor(message.guild.name, message.guild.iconURL)
                        .setDescription(`Lütfen sunucu sayısından [${message.guild.members.size}] daha yüksek bir değer girin!`)
                        .setColor("RANDOM")
                        .setTimestamp()
						.setFooter("Pleaxy", client.user.avatarURL)
                message.channel.send({embed})
                return
        }
 
        if(!profil[message.guild.id]){
                profil[message.guild.id] = {
                        sayi: args[0]
                };
        }
       
        profil[message.guild.id].sayi = args[0]
       
        fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
                console.log(err)
        })
 
        const embed = new Discord.RichEmbed()
				.setAuthor(message.guild.name, message.guild.iconURL)
                .setDescription(`Sayaç başarıyla ${args[0]} olarak ayarlandı!`)
                .setColor("RANDOM")
                .setTimestamp()
				.setFooter("Pleaxy", client.user.avatarURL)
        message.channel.send({embed})
};
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayacayarla', 'sayaç-ayarla', 'sayac-ayarla', 'sayac', 'sayaç'],
        permLevel: 2,
};
 
exports.help = {
        name: 'sayaçayarla',
        description: 'Sayacı ayarlar.',
        usage: 'sayaçayarla [sayı/sıfırla]'
};