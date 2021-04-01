const losa = require('../module/losa')
const add_channel = require('./module/add_channel')
const new_character = require('./module/new_character')
const update_embeds = require('./module/update_embeds')

module.exports = async (client, message, config) => {
    // Variáveis
    author = message.author
    channelID = message.channel.id
    guildID = message.channel.guild.id
    server_config = losa.load('./server_config.json')

    // COMMANDS
    if(message.content.split(' ')[0].includes(server_config[guildID].prefix)) {
        // Criando comando
        command = message.content.toLowerCase().split(' ')[0].slice(server_config[guildID].prefix.length)
        // Removing prefix from message
        message.content = message.content.substr(server_config[guildID].prefix.length)


        // Adicionando Canal RPG
        if(command == 'setchannelrpg' && author.id == config.admin) {
            add_channel.add(message)
        }

        // Removendo Canal RPG
        if(command == 'removechannelrpg' && author.id == config.admin) {
            add_channel.remove(message)
        }

        // Verifica se o canal está ativado
        if(channelID != server_config[guildID].rpg.channel) return

        // Criar characters
        if(command == 'newchar' || message.content == 'new char') {
            new_character(client, message)
        }

        // Info
        if(message.content == 'info char') {
            update_embeds.infoChar(message)
        }
    }
}