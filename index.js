const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const ArvisDB = require("croxydb")
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });

    console.log(`${props.name} İsimli Komut Yüklendi`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`${name} Event Yüklendi`)
});
client.login(TOKEN)


client.on("guildMemberAdd", member => {
    let gMesaj = ArvisDB.get(`hgbbGirisMesaj_${member.guild.id}`);
    const kanal = ArvisDB.get(`hgbb_${member.guild.id}`)
    if (!kanal) return;

    let embed = new Discord.EmbedBuilder()
        .setTitle("Sunucuya Katıldı")
        .setDescription(gMesaj || `${member} Sunucuya Katıldı! **${member.guild.memberCount}** Kişi Olduk`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: "ArviS#0011" })
        .setColor("Green")

    member.guild.channels.cache.get(kanal).send({ embeds: [embed] })
});

client.on("guildMemberRemove", member => {

    let cMesaj = ArvisDB.get(`hgbbCikisMesaj_${member.guild.id}`);
    const kanal = ArvisDB.get(`hgbb_${member.guild.id}`)
    if (!kanal) return;

    let embed = new Discord.EmbedBuilder()
        .setTitle("Sunucudan Ayrıldı")
        .setDescription(cMesaj || `${member} Sunucudan Ayrıldı! **${member.guild.memberCount}** Kişi Olduk`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: "ArviS#0011" })
        .setColor("Red")

    member.guild.channels.cache.get(kanal).send({ embeds: [embed] })
});


client.on('interactionCreate', async interaction => {

    const embed = new Discord.EmbedBuilder()
        .setTitle("Yetersiz Yetki")
        .setDescription("> Bu Komutu Kullanabilmek İçin `Kanalları Yönet` Yetkisine Sahip Olman Lazım")
        .setFooter({ text: "ArviS#0011" })
        .setColor("Red")

    const embed1 = new Discord.EmbedBuilder()
        .setTitle("Başarıyla Sıfırlandı")
        .setDescription("> Hoş Geldin Sistemi Başarıyla **Sıfırlandı**")
        .setColor("Green")

    if (!interaction.isButton()) return;
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [embed], ephemeral: true });
    if (interaction.customId === "kapat") {
        ArvisDB.delete(`hgbb_${interaction.guild.id}`)
        ArvisDB.delete(`hgbbCikisMesaj_${interaction.guild.id}`)
        ArvisDB.delete(`hgbbGirisMesaj_${interaction.guild.id}`)
        interaction.reply({ embeds: [embed1], ephemeral: true })
    }
})

client.on('interactionCreate', async interaction => {

    const embed = new Discord.EmbedBuilder()
        .setTitle("Yetersiz Yetki")
        .setDescription("> Bu Komutu Kullanabilmek İçin `Kanalları Yönet` Yetkisine Sahip Olman Lazım")
        .setFooter({ text: "ArviS#0011" })
        .setColor("Red")

    const embed1 = new Discord.EmbedBuilder()
        .setTitle("Başarıyla Sıfırlandı")
        .setDescription("> Hoş Geldin Sistemi Başarıyla **Sıfırlandı**")
        .setColor("Green")

    const embed2 = new Discord.EmbedBuilder()
        .setTitle("Zaten Sıfırlanmış")
        .setDescription("> Hoş Geldin Sistemi Zaten Sıfırlanmış")
        .setColor("Red")

    if (!interaction.isButton()) return;

    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [embed], ephemeral: true });
    if (interaction.customId === "kapat1") {
        ArvisDB.delete(`hgbb_${interaction.guild.id}`)
        ArvisDB.delete(`hgbbCikisMesaj_${interaction.guild.id}`)
        ArvisDB.delete(`hgbbGirisMesaj_${interaction.guild.id}`)
        interaction.reply({ embeds: [embed1], ephemeral: true })
    }
})

client.on('interactionCreate', async interaction => {

    let msj = ArvisDB.get(`hgbbCikisMesaj_${interaction.guild.id}`)
    let msj2 = ArvisDB.get(`hgbbGirisMesaj_${interaction.guild.id}`)

    const mesaj = new Discord.EmbedBuilder()
        .setTitle("Ayarlanan Mesaj")
        .setDescription(`📥 **Giriş Mesajı:** ${msj} \n\n📤 **Çıkış Mesajı:** ${msj2}`)
        .setColor("Yellow")

    const uyari = new Discord.EmbedBuilder()
        .setTitle("Başarısız")
        .setDescription(`Sistem Ayarlı Değil Veya Mesaj Ayarlanmamış`)
        .setColor("Red")

    const embed = new Discord.EmbedBuilder()
        .setTitle("Yetersiz Yetki")
        .setDescription("> Bu Komutu Kullanabilmek İçin `Kanalları Yönet` Yetkisine Sahip Olman Lazım")
        .setFooter({ text: "ArviS#0011" })
        .setColor("Red")

    if (!interaction.isButton()) return;
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [embed], ephemeral: true });
    if (interaction.customId === "goster") {
        if (!msj) return interaction.reply({ embeds: [uyari], ephemeral: true })
        if (!msj2) return interaction.reply({ embeds: [uyari], ephemeral: true })
        interaction.reply({ embeds: [mesaj], ephemeral: true })
    }
})









// ArviS#0011 