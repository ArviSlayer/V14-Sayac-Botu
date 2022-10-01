const Discord = require('discord.js');
const { PermissionsBitField } = require("discord.js")
const ArvisDB = require("croxydb");
module.exports = {
    name: "hoşgeldin-sistemi",
    description: "Hoş Geldin Sistemini Ayarlamanızı Sağlar",
    type: 1,
    options: [
        {
            name: "kanal",
            description: "Hoş Geldin Kanalını Ayarlamanızı Sağlar",
            type: 7,
            required: true,
            channel_types: [0]
        },

        {
            name: "giris-mesaj",
            description: "Hoş Geldin Kanalına Atılacak Giriş Mesajını Ayarlamanızı Sağlar",
            type: 3,
            required: false
        },

        {
            name: "cikis-mesaj",
            description: "Hoş Geldin Kanalına Atılacak Çıkış Mesajını Ayarlamanızı Sağlar",
            type: 3,
            required: false
        }
    ],
    run: async (client, interaction) => {

        const row = new Discord.ActionRowBuilder()

            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("🔐")
                    .setLabel("Sistemi Kapat")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("kapat")
            )

        const row1 = new Discord.ActionRowBuilder()

            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("👀")
                    .setLabel("Mesajı Göster")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setCustomId("goster")
            )

            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("🔐")
                    .setLabel("Sistemi Kapat")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setCustomId("kapat1")
            )

        const embed = new Discord.EmbedBuilder()
            .setTitle("Yetkin Yok")
            .setDescription("Bu Komutu Kullanabilmek İçin `Kanalları Yönet` Yetkisine Sahip Olman Lazım")
            .setFooter({ text: "ArviS#0011" })
            .setColor("Red")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [embed], ephemeral: true })

        const gMesaj = interaction.options.getString('giris-mesaj')
        const cMesaj = interaction.options.getString('cikis-mesaj')
        const kanal = interaction.options.getChannel('kanal')

        ArvisDB.set(`hgbb_${interaction.guild.id}`, kanal.id)
        ArvisDB.set(`hgbbCikisMesaj_${interaction.guild.id}`, cMesaj)
        ArvisDB.set(`hgbbGirisMesaj_${interaction.guild.id}`, gMesaj)

        const kanalEmbed = new Discord.EmbedBuilder()
            .setTitle("Başarıyla Ayarlandı")
            .setDescription("Hoş Geldin Sistemi Başarıyla Ayarlandı")
            .setFooter({ text: "ArviS#0011" })
            .setColor("Green")

        if (gMesaj, cMesaj) return interaction.reply({ embeds: [kanalEmbed], components: [row1] })
        if (!gMesaj, !cMesaj) return interaction.reply({ embeds: [kanalEmbed], components: [row1] })
    }
};









// ArviS#0011