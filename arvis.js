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
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,// ArviS#0011
        dm_permission: props.dm_permission,
        type: 1
    });

    console.log(`[YÜKLENDİ] Komut: ${props.name}`)

});
readdirSync('./events').forEach(e => {


    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[YÜKLENDİ] Event: ${name}`)
});
client.login("")


client.on("guildMemberAdd", member => {
    let gMesaj = ArvisDB.get(`hgbbGirisMesaj_${member.guild.id}`);
    const kanal = ArvisDB.get(`hgbb_${member.guild.id}`)// ArviS#0011
    if (!kanal) return;

    let embed = new Discord.EmbedBuilder()
        .setTitle(`Vahşi Bir Üye Belirdi!`)
        .setDescription(gMesaj || `<a:elsallama_arvis0011:1048619375655133255> Selamm ${member}, Aramıza Hoş Geldin  

        > Seninle Birlikte **${member.guild.memberCount}** Kişi Olduk`)
        .setThumbnail(member.user.displayAvatarURL())
        .setColor("#03fc07")

    member.guild.channels.cache.get(kanal).send({ embeds: [embed] })
});

client.on("guildMemberRemove", member => {

    let cMesaj = ArvisDB.get(`hgbbCikisMesaj_${member.guild.id}`);// ArviS#0011
    const kanal = ArvisDB.get(`hgbb_${member.guild.id}`)// ArviS#0011
    if (!kanal) return;

    let embed = new Discord.EmbedBuilder()
        .setTitle("Vahşi Üye, Aramızdan Ayrıldı :(")
        .setDescription(cMesaj || `${member} Neden Gittin... <:m_sigara:1048331999712116837>

        > Sensiz **${member.guild.memberCount}** Kişi Kaldık`)
        .setThumbnail(member.user.displayAvatarURL())// ArviS#0011
        .setColor("#fc0303")

    member.guild.channels.cache.get(kanal).send({ embeds: [embed] })
});// ArviS#0011


client.on('interactionCreate', async interaction => {// ArviS#0011
// ArviS#0011
    const embed = new Discord.EmbedBuilder()// ArviS#0011
        .setTitle("Yetersiz Yetki")// ArviS#0011
        .setDescription("> Bu Komutu Kullanabilmek İçin `Kanalları Yönet` Yetkisine Sahip Olman Lazım")
        .setFooter({ text: "ArviS#0011" })
        .setColor("#fc0303")// ArviS#0011
// ArviS#0011
    const embed1 = new Discord.EmbedBuilder()
        .setTitle("Başarıyla Sıfırlandı")// ArviS#0011
        .setDescription("> Hoş Geldin Sistemi Başarıyla **Sıfırlandı**")// ArviS#0011
        .setColor("#03fc07")// ArviS#0011

    if (!interaction.isButton()) return;// ArviS#0011
// ArviS#0011
        interaction.reply({ embeds: [embed1], ephemeral: true })
    }
})

client.on('interactionCreate', async interaction => {

    const embed = new Discord.EmbedBuilder()
        .setTitle("Yetersiz Yetki")
        .setDescription("> Bu Komutu Kullanabilmek İçin `Kanalları Yönet` Yetkisine Sahip Olman Lazım")
        .setFooter({ text: "ArviS#0011" })
        .setColor("#fc0303")

    const embed1 = new Discord.EmbedBuilder()// ArviS#0011
        .setTitle("Başarıyla Sıfırlandı")// ArviS#0011
        .setDescription("> Hoş Geldin Sistemi Başarıyla **Sıfırlandı**")
        .setColor("#03fc07")// ArviS#0011

    const embed2 = new Discord.EmbedBuilder()
        .setTitle("Zaten Sıfırlanmış")// ArviS#0011
        .setDescription("> Hoş Geldin Sistemi Zaten Sıfırlanmış")// ArviS#0011
        .setColor("#fc0303")

    if (!interaction.isButton()) return;

    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [embed], ephemeral: true });
    if (interaction.customId === "kapat1") {
        ArvisDB.delete(`hgbb_${interaction.guild.id}`)
        ArvisDB.delete(`hgbbCikisMesaj_${interaction.guild.id}`)// ArviS#0011
        ArvisDB.delete(`hgbbGirisMesaj_${interaction.guild.id}`)
        interaction.reply({ embeds: [embed1], ephemeral: true })// ArviS#0011
    }
})// ArviS#0011

client.on('interactionCreate', async interaction => {

    let msj = ArvisDB.get(`hgbbCikisMesaj_${interaction.guild.id}`)
    let msj2 = ArvisDB.get(`hgbbGirisMesaj_${interaction.guild.id}`)

    const mesaj = new Discord.EmbedBuilder()
        .setTitle("Ayarlanan Mesaj")
        .setDescription(`📥・**Giriş Mesajı:** ${msj} \n\n📤・**Çıkış Mesajı:** ${msj2}`)
        .setColor("#ebfc03")
// ArviS#0011
    const uyari = new Discord.EmbedBuilder()
        .setTitle("Başarısız")// ArviS#0011
        .setDescription(`Sistem Ayarlı Değil Veya Mesaj Ayarlanmamış`)
        .setColor("#fc0303")
// ArviS#0011
    const embed = new Discord.EmbedBuilder()
        .setTitle("Yetersiz Yetki")// ArviS#0011
        .setDescription("> Bu Komutu Kullanabilmek İçin `Kanalları Yönet` Yetkisine Sahip Olman Lazım")
        .setFooter({ text: "ArviS#0011" })
        .setColor("#fc0303")

    if (!interaction.isButton()) return;// ArviS#0011
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [embed], ephemeral: true });
    if (interaction.customId === "goster") {
        if (!msj) return interaction.reply({ embeds: [uyari], ephemeral: true })
        if (!msj2) return interaction.reply({ embeds: [uyari], ephemeral: true })
        interaction.reply({ embeds: [mesaj], ephemeral: true })
    }
})
