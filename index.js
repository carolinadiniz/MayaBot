const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const losa = require('./module/losa')
const token = require('./token.json')

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
        // Cria um arquivo para RPG Characters     rpg/character/serverID.json
        if(!fs.existsSync(`./RPG/database/serverID_${raw.d.id}.json`)) {
            fs.writeFileSync(`./RPG/database/serverID_${raw.d.id}.json`, "{}")
            console.log(`\x1b[33mCriando arquivo \x1b[1m./RPG/database/serverID_${raw.d.id}.json\x1b[0m`)
        }
    }
})

client.on('message', message => {

})

client.login(token.token)