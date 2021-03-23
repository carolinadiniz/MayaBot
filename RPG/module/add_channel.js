const losa = require('../../module/losa')

module.exports = {
    add: (message) => {
        server_config = losa.load('./server_config.json')
        server_config[message.channel.guild.id].rpg.channel = message.channel.id
        losa.save(server_config, './server_config.json')
        message.channel.send(`Canal '**${message.channel.name}**' configurado como canal de rpg`)
        console.log(`\x1b[32mAdicionando canal \x1b[1m${message.channel.name}\x1b[0m\x1b[32m como canal de RPG\x1b[0m`)
    },
    remove: (message) => {
        server_config = losa.load('./server_config.json')
        server_config[message.channel.guild.id].rpg.channel = null
        losa.save(server_config, './server_config.json')
        message.channel.send(`Canal de RPG removido`)
        console.log(`\x1b[31mRemovendo canal \x1b[1m${message.channel.name}\x1b[0m\x1b[31m do banco de dados\x1b[0m`)
    }
}