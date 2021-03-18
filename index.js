const Discord = require('discord.js')
const client = new Discord.Client()
const losa = require('./module/losa')
const token = require('./token.json')

const server_config_path = './database/server_config.json'


client.on('ready', () => {
    
})

client.on('raw', raw => {

})

client.on('message', message => {

})

client.login(token.token)