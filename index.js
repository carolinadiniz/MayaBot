const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const losa = require('./module/losa')
const config = require('./config.json')
const RPG = require('./RPG/RPG')

const server_config_path = './server_config.json'


client.on('ready', () => {
    console.log('***** SERVER ONLINE *****')    
})

client.on('raw', raw => {
    // Verifica se serverID está no banco de dados
    if(raw.t == "GUILD_CREATE") {
        server_config = losa.load(server_config_path)

        // Adicionar serverID ao banco de dados database/server_config.json
        if(!Object.keys(server_config).includes(raw.d.id)) {
            server_config[raw.d.id] = {
                status: true,
                name: raw.d.name,
                prefix: '!',
                rpg: { channel: null }
            }
            losa.save(server_config, server_config_path)
            console.log(`\x1b[32mNovo servidor adicionado: \x1b[1m${raw.d.name}\x1b[0m`)
        }
        // Criar arquivos json para RPG characters     ./RPG/database/serverID_xxxxxxxxx.json
        if(!fs.existsSync(`./RPG/database/serverID_${raw.d.id}.json`)) {
            fs.writeFileSync(`./RPG/database/serverID_${raw.d.id}.json`, '{}')
            console.log(`\x1b[33mCriando arquivo database ./RPG/database/serverID_${raw.d.id}.json\x1b[0m`)
        }
    }
})

client.on('message', message => {
    server_config = losa.load(server_config_path)

    // Se server estiver false
    if(server_config[`${message.channel.guild.id}`].status == false) return
    if(message.content.toLowerCase().split(' ')[0] == 'kawobotsetprefix' && message.author.id == config.admin) {
        server_config[message.channel.guild.id].prefix = message.content.split(' ')[1]
        losa.save(server_config, server_config_path)
        message.channel.send(`Prefix do server **${message.channel.guild.name}** alterado para **${message.content.split(' ')[1]}**`)
        console.log(`\x1b[33mPrefix do server ${message.channel.guild.name} alterado para \x1b[32m${message.content.split(' ')[1]}\x1b[0m`)
    }
    RPG(message)
    console.log(message.content)
})

client.login(config.token)