const losa = require("../module/losa")

module.exports = (message) => {/*
    // Cria um arquivo para RPG Characters     rpg/character/serverID.json
    if(!fs.existsSync(`./RPG/database/serverID_${raw.d.id}.json`)) {
        fs.writeFileSync(`./RPG/database/serverID_${raw.d.id}.json`, "{}")
        console.log(`\x1b[33mCriando arquivo \x1b[1m./RPG/database/serverID_${raw.d.id}.json\x1b[0m`)
    }*/
    // Variáveis
    author = message.author
    channelID = message.channel.id
    guildID = message.channel.guild.id

    base_path = `./RPG/database/level_base.json`
    characters_path = `./RPG/database/serverID_${guildID}.json`
    server_config_path = './server_config.json'

    base = losa.load(base_path)
    characters = losa.load(characters_path)
    server_config = losa.load(server_config_path)

    user = characters[author.id]

    // COMMANDS
    if(message.content.split(' ')[0].includes(server_config[guildID].prefix)) {
        // Criando comando
        command = message.content.toLowerCase().split(' ')[0].slice(server_config[guildID].prefix.length)
        
    }
}